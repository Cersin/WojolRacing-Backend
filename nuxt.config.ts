import { defineNuxtConfig } from 'nuxt'
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
    devtools: process.env.NODE_ENV !== 'production',
    css: [
        '~/styles/_base.scss'
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "~/styles/_variables.scss";',
                },
            },
        },
    },
    publicRuntimeConfig: {
        api: process.env.NODE_ENV !== 'production' ? process.env.API : process.env.API_PROD
    }
})
