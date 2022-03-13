<template>
  <div id="blog">
    <div v-if="isIndex || tag">
      <SocialHead
        :title="tag ? `AutoTube blog posts with tag ${tag}` : 'Autotube Blog' "
        :description="tag ? `Read latest AutoTube blog posts about ${tag}` : 'Read latest AutoTube blog posts'"
      />
      <h1 class="mb-2">
        Posts <span v-if="tag"> with tag #{{ tag }} </span>
      </h1>
      <ul class="post-list">
        <li v-for="post in articles" :key="post.slug">
          <time :datetime="post.createdAt" class="body-2"> {{ formatDate(post.createdAt) }}</time>
          <NuxtLink class="post-title" :class="{'dark': $vuetify.theme.dark}" :to="'/blog/' + post.slug">
            {{ post.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <article v-else>
      <SocialHead
        :title="article.title"
        :description="article.description"
      />
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
    const isIndex = params.pathMatch === 'index'
    const patMatchSplit = params.pathMatch.split('/')

    if (isIndex) {
      // get articles list
      // filter by tag ?
      let where = {}
      const tag = query.tag
      if (query.tag) { where = { tags: { $contains: tag } } }
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
        error({ statusCode: 404, message: 'Article not found' })
      }
    // tag
    } else if (patMatchSplit.length === 2 && patMatchSplit[0] === 'tag') {
      const tag = patMatchSplit[1]
      const articles = await $content('blog').where({ tags: { $contains: tag } }).sortBy('createdAt', 'desc').fetch()
      if (articles.length === 0) {
        error({ statusCode: 404, message: 'No articles found' })
        return
      }
      return {
        tag,
        isIndex,
        articles
      }
    } else {
      error({ statusCode: 404, message: 'Not found' })
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
    if (this.article === null) {
      return
    }
    return {
      title: this.article ? this.article.title : '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
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

<style scoped>

/*
#blog {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji" !important;
}
*/

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

a.dark:hover {
  color: #f48828;
  text-decoration: none;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 0.3em;
}

time {
  color: #999;
}

.post-title {
  font-size: 1.3em;
  margin-left: 0.5em;
}

</style>
