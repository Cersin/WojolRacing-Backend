import {useFetch, useRuntimeConfig} from "nuxt/app";
import {tryParseJSONObject} from "~/utils/helpers";
import {useToast} from "vue-toastification";
import {ref} from "vue";
const toast = useToast();

const loading = ref(false);

export const useMyFetch = () => {
    const config = useRuntimeConfig()

    const myFetch = async (request, opts, returnErrors = true) => {
        const {error, data} = await useFetch(request, {baseURL: config.API_BASE_URL, initialCache: false, ...opts});
        if (error.value?.data) {
            if (tryParseJSONObject(error.value.data?.message) && returnErrors) {
                const errors = error.value.data.message;
                throw new Error(errors)
            } else {
                toast.error(error.value.data.message || 'error');
                throw new Error(error.value.data.message || 'error');
            }
        }
        if (data?.value) {
            return data.value;
        }
    }

    return {
        myFetch,
        loading
    }

}