<template>
  <v-container>
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
        <h1>{{ article.title }}</h1>
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
    const dev = process.env.NODE_ENV !== 'production'
    const server = dev ? 'http://localhost:3000' : 'https://autotube.app'
    if (!params.slug) {
      redirect(302, `${server}/docs/introduction`)
    }
    const article = await $content('docs', params.slug).fetch()

    const toc = await $content('docs')
      .only(['slug', 'path'])
      .sortBy('index')
      .fetch()

    return { article, toc }
  },
  head () {
    return {
      title: this.article.title,
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
