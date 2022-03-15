<template>
  <div id="docs">
    <v-container v-if="toc && article">
      <SocialHead
        :title="article.title"
        :description="article.description"
        :image="article.image"
      />
      <v-row>
        <v-col
          id="toc"
          cols="12"
          md="3"
          lg="2"
          class="pa-1 pt-6 mr-5 d-xs-flex d-sm-block"
        >
          <ul>
            <li v-for="(data, cat) in toc" :key="cat.key" class="mb-3">
              {{ cat }}
              <ul>
                <li v-for="(doc) in data" :key="doc.slug" class="ml-2 pt-1">
                  <NuxtLink :to="'/docs/' + doc.slug" :class="{'dark': $vuetify.theme.dark}">
                    {{ doc.dLink }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </v-col>
        <v-col>
          <nuxt-content :document="article" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  async asyncData ({
    $content,
    params,
    redirect
  }) {
    if (!params.slug) {
      params.slug = 'introduction'
    }
    const article = await $content('docs', params.slug).fetch()

    // get all the articles summary
    const articles = await $content('docs')
      .only(['slug', 'path', 'category', 'dLink'])
      .sortBy('index')
      .fetch()
    // get all the categories
    const categories = articles.map(item => item.category).filter((item, index, array) => array.indexOf(item) === index)
    const toc = {}
    for (const cat of categories) {
      toc[cat] = articles.filter(item => item.category === cat)
    }
    return {
      article,
      toc
    }
  },
  data () {
    return {
      toc: null,
      article: null
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
  }
}
</script>

<style lang="scss">

#docs {
  #toc {
    border-right-style: solid;
    border-right-color: rgba(25, 118, 210, 0.3);
    border-right-width: 1px;
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

  a.dark.nuxt-link-exact-active {
    color: #f48828;
    font-weight: normal;
  }

  h2 {
    margin-top: 1rem;
  }

  h3 {
    margin-top: 0.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li.sub-menu {
    margin-left: 0.5rem;
  }
}

</style>
