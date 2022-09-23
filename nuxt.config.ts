import { defineNuxtConfig } from 'nuxt'
import svgLoader from "vite-svg-loader"

 // https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    head: {
        title: 'Wojol Racing',
        htmlAttrs: {
            lang: 'pl'
        }
    },
    serverMiddleware: [
        {path: '/api', handler: '~/server/index.js'}
    ],
    plugins: ["~/plugins/vee-validate", "~/plugins/vee-validate-components"],
    build: {
        transpile: ['vee-validate']
    },
    modules: [
      '@vueuse/nuxt'
    ],
    devtools: process.env.NODE_ENV !== 'production',
    css: [
        '~/styles/_base.scss',
        'css-ripple-effect/dist/ripple.css'
    ],
    ssr: false,
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "~/styles/_variables.scss";',
                },
            },
        },
    },
    runtimeConfig: {
        public: {
            status: process.env.NODE_ENV,
            API_BASE_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/' : 'http://localhost:3000/api/'
        }
    }
})
