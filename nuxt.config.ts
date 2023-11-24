// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ['@/assets/styles/scss/main.scss'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ['nuxt-quasar-ui', '@vee-validate/nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  quasar: {
    plugins: ['Notify'],
    config: {
      dark: true,
      notify: {
        timeout: 3000,
        position: 'bottom-right'
      }
    },
    extras: {
      fontIcons: ['material-icons'],
    },
  },
  imports: {
    autoImport: true,
  },
})