<template>
  <div id="blog">
    <SocialHead
      :title="headTitle"
      :description="headDescription"
    />
    <div v-if="isIndex || tag">
      <h1 class="mb-2">
        Posts <span v-if="tag"> with tag #{{ tag }} </span>
      </h1>
      <ul class="post-list">
        <li v-for="post in articles" :key="post.slug">
          <time :datetime="post.createdAt" class="body-2"> {{ formatDate(post.createdAt) }}</time>
          <NuxtLink class="post-title" :to="'/blog/' + post.slug">
            {{ post.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <article v-else>
      <header class="mb-6">
        <h1 class="mt-2" style="line-height: 50px">
          {{ article.title }}
        </h1>
        <div class="body-2">
          <time class="mt-0 pt-0 mr-3" :datetime="article.createdAt"> {{ formatDate(article.createdAt) }}</time>
          <span v-for="artTag in article.tags" :key="artTag" class="mr-1 body-2">
            <NuxtLink :to="'/blog/tag/' + artTag">#{{ artTag }}</NuxtLink>
          </span>
        </div>
      </header>
      <section>
        <nuxt-content :document="article" />
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Blog',

  async asyncData ({
    $content,
    params,
    query,
    error
  }) {
    // index | slug | tag
    console.log(params.pathMatch)
    const isIndex = params.pathMatch === undefined
    console.log('isIndex', isIndex)
    let patMatchSplit = []
    if (!isIndex) {
      patMatchSplit = params.pathMatch?.split('/')
    }
    console.log(patMatchSplit)

    if (isIndex) {
      // get articles list
      // filter by tag ?
      let where = {}
      const tag = query.tag
      if (query.tag) {
        where = { tags: { $contains: tag } }
      }
      const articles = await $content('blog').only(['title', 'slug', 'createdAt']).where(where).sortBy('createdAt', 'desc').fetch()
      return {
        tag,
        isIndex,
        articles,
        nbArticles: articles.length
      }
      // article
    } else if (patMatchSplit.length === 1) {
      const slug = patMatchSplit[0]
      try {
        const article = await $content('blog', slug).fetch()
        return {
          isIndex,
          article
        }
      } catch (e) {
        error({
          statusCode: 404,
          message: 'Article not found'
        })
      }
      // tag
    } else if (patMatchSplit.length === 2 && patMatchSplit[0] === 'tag') {
      const tag = patMatchSplit[1]
      const articles = await $content('blog').where({ tags: { $contains: tag } }).sortBy('createdAt', 'desc').fetch()
      if (articles.length === 0) {
        error({
          statusCode: 404,
          message: 'No articles found'
        })
        return
      }
      return {
        tag,
        isIndex,
        articles
      }
    } else {
      error({
        statusCode: 404,
        message: 'Not found'
      })
    }
  },

  data () {
    return {
      isIndex: false,
      articles: [],
      article: null,
      tag: null
    }
  },
  head () {
    return {
      title: this.headTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.headDescription
        }
      ]
    }
  },

  computed: {
    headDescription () {
      if (this.article) {
        return this.article.description
      }
      if (this.tag) {
        return `Read latest AutoTube blog posts about ${this.tag}`
      }
      return 'Read latest AutoTube blog posts'
    },
    headTitle () {
      if (this.article) {
        return this.article.title
      }
      if (this.tag) {
        return `AutoTube blog posts with tag ${this.tag}`
      }
      return 'Autotube Blog'
    }
  },

  methods: {
    formatDate (date) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return new Date(date).toLocaleDateString('en', options)
    }

  }

}
</script>

<style lang="scss">

$orange: #ff9800;
$blue: #2196f3;

#blog {
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a.post-title  {
    vertical-align: middle;
    font-size: 1.3rem;
    margin-left: 0.3rem;
  }

  blockquote {
    border-left: 5px solid $blue;
    padding-left: 1rem;
    padding-bottom: 0.1rem;
    padding-top: .8rem;
    margin: 0.5rem 1rem;
    font-style: italic;
  }

  h2 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  ul.post-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.3rem;
  }

  time {
    vertical-align: middle;
    color: #999;
  }

}

.theme--dark #blog {
  a {
    text-decoration: none;
  }

  a:hover {
    color: $orange;
    text-decoration: none;
  }

  blockquote {
    border-color: $orange;
  }

}

</style>
