import {reactive} from 'vue';
import {useRuntimeConfig} from "nuxt/app";
import {navigateTo} from "nuxt/app";
import {useToast} from "vue-toastification";

const toast = useToast();

const authState = reactive({
    logged: false
});

export const useAuthComposable = () => {
    const config = useRuntimeConfig();

    const login = async ({username, password}) => {
        try {
            const res = await $fetch(`/users/login`, {
                method: 'POST',
                baseURL: config.API_BASE_URL,
                body: {
                    name: username,
                    password: password
                }
            });
            const {message, status} = res;
            if (status !== 'success') {
                authState.logged = false;
                throw new Error(message);
            } else {
                authState.logged = true;
                toast.success('Zalogowano');
                navigateTo('/');
            }
        } catch (e) {
            toast.error(e?.data?.message || 'Error');
        }
    }

    const auth = async () => {
        try {
            const res = await $fetch(`/users/verify`, {
                method: 'GET',
                baseURL: config.API_BASE_URL,
            });
            authState.logged = !!res.logged;
            return res.logged;
        } catch (e) {
            return false;
        }
    }

    return {
        authState,
        login,
        auth
    }
}
