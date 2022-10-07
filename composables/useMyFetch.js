import {useFetch, useRuntimeConfig} from "nuxt/app";

export const useMyFetch = (request, opts) => {
    const config = useRuntimeConfig()

    return useFetch(request, { baseURL: config.API_BASE_URL, initialCache: false, ...opts })
}