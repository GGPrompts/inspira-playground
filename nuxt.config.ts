// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@maz-ui/nuxt',
  ],

  css: [
    '~/assets/css/main.css',
  ],

  typescript: {
    strict: true,
  },

  app: {
    head: {
      title: 'Inspira Playground',
      meta: [
        { name: 'description', content: 'Playing with Inspira UI components' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap' }
      ],
    }
  }
})
