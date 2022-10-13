import {useFetch, useRuntimeConfig} from "nuxt/app";
import {tryParseJSONObject} from "~/utils/helpers";
import {useToast} from "vue-toastification";
const toast = useToast();

export const useMyFetch = async (request, opts) => {
    const config = useRuntimeConfig()

    const {error, data} = await useFetch(request, {baseURL: config.API_BASE_URL, initialCache: false, ...opts});
    if (error.value?.data) {
        if (tryParseJSONObject(error.value.data?.message)) {
            const errors = error.value.data.message;
            throw new Error(errors)
        } else {
            toast.error(error.value.data.message || 'error');
        }
    }
    if (data?.value) {
        return data.value;
    }
}