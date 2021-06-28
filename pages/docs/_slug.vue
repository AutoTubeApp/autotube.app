<template>
  <v-container v-if="toc && article">
    <v-row>
      <v-col
        id="toc"
        cols="2"
        class="pa-1 pt-3 mr-2 pr-3"
      >
        <v-list-item
          v-for=" t in toc"
          :key="t.slug"
          nuxt
          :to="t.path"
        >
          <v-list-item-content>
            <v-list-item-title class="text-capitalize">
              {{ t.slug }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col>
        <h1>
          {{ article.title }}
        </h1>
        <nuxt-content :document="article" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  async asyncData ({
    $content,
    params,
    redirect
  }) {
    const server = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://autotube.app'
    if (!params.slug) {
      try {
        await redirect(302, `${server}/docs/introduction`)
        return
      } catch (e) {
        return
        // do nothing is to avoid error
        // a0417b4.js:2 Uncaught (in promise) Error: ERR_REDIRECT
        // le problème c'est qu'on demande au routeur de venir ici pour ensuite
        // faire un redirect "direct"
        // push('/route') && redirect
      }
    }
    const article = await $content('docs', params.slug).fetch()

    const toc = await $content('docs')
      .only(['slug', 'path'])
      .sortBy('index')
      .fetch()
    return { article, toc }
  },

  data () {
    return {
      toc: null,
      article: null
    }
  },
  head () {
    if (this.article === null) { return }
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

  mounted () {
  }

}

</script>

<style>
h1 {
  color: #1565C0;
}
#toc {
  border-right-style: solid;
  border-right-color: rgba(25, 118, 210, 0.3);
  border-right-width: 1px;
}

.nuxt-content {
  color: #E3F2FD;
}

.nuxt-content h2 {
  color: #1976D2;
  padding-bottom: .5rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  border-bottom-width: 1px;
  border-bottom-color: rgba(25, 118, 210, 0.3);
  border-bottom-style: solid;

}

.nuxt-content a {
  color: #BBDEFB!important;
}

.nuxt-content pre {
  background-color: #fdf6ef;
}

</style>
