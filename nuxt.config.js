module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Welcome to Lasses parked space!',
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
        content: 'Lasse is a freelance designer, programmer and maker. He loves JS and his sewingmachine.'
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
      href:"/loadingstyle.css"
    },
    {
      rel:"stylesheet",
      type:"text/css",
      href:"/fonts/stylesheet.css"
    }
    ]
  },

  mode: 'spa',

  loading: false,
  loadingIndicator: '~/static/initloaderspa.html',
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
