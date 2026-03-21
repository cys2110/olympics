// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/hints",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-echarts",
    "@nuxtjs/leaflet",
    "nuxt-mongoose"
  ],

  // Set page transitions
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in"
    }
  },

  // Set scroll behaviour
  router: {
    options: {
      scrollBehaviorType: "smooth"
    }
  },

  // CSS path
  css: ["~/assets/css/main.css"],

  // Turn on typed router
  experimental: {
    typedPages: true
  },

  mongoose: {
    uri: process.env.MONGODB_URI,
    modelsDir: "models",
    devtools: true
  },

  ui: {
    theme: {
      colors: ["primary", "secondary", "success", "warning", "info", "error", "neutral"]
    }
  }
})
