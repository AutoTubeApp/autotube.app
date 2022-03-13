<template>
  <div id="blog">
    <div v-if="isIndex || tag">
      <h1>Posts <span v-if="tag"> with tag #{{ tag }} </span> </h1>
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
      <header class="mb-6">
        <h1 class="mt-2" style="line-height: 50px">
          {{ article.title }}
        </h1>
        <div class="body-2">
          <time class="mt-0 pt-0 mr-3" :datetime="article.createdAt"> {{ formatDate(article.createdAt) }}</time>
          <span v-for="tag in article.tags" :key="tag" class="mr-1 body-2">
            <NuxtLink key="tag" :to="'/blog/tag/' + tag">#{{ tag }}</NuxtLink>
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
    const isIndex = params.pathMatch === ''
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
      console.log('tag', tag)
      const articles = await $content('blog').where({ tags: { $contains: tag } }).sortBy('createdAt', 'desc').fetch()
      console.log(articles)
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

    /*    const path = `/${ctx.params.pathMatch || 'index'}`
    console.log('path', path)

    console.log('ctx.params.slug', ctx.params)
    console.log('ctx.route.path', ctx.route.path)

    const { $content } = ctx

    const nbArticles = (await $content('blog', { deep: true }).only([]).fetch()).length
    console.log('nbArticles', nbArticles)
    const article = await $content('blog', ctx.params.slug, { deep: true }).fetch()
    console.log(article)

    const toc = await $content('blog')
      .only(['slug', 'path'])
      .sortBy('index')
      .fetch()
    return { article, toc } */
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
