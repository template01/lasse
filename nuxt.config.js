module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'lasse',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel:"stylesheet",
      type:"text/css",
      href:"/fonts/stylesheet.css"
    }
    ]
  },

  mode: 'spa',

  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    /* ['@nuxtjs/google-analytics', { ua: 'YOUR_ANALYTICS_ID' }], */
    ['@nuxtjs/markdownit', { html: true, linkify: true, breaks: true }]
  ]
}
