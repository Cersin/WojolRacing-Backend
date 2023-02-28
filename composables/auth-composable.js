import {reactive} from 'vue';
import {useRuntimeConfig} from "nuxt/app";
import {navigateTo} from "nuxt/app";
import {useToast} from "vue-toastification";

const toast = useToast();

const authState = reactive({
    logged: false,
    role: ''
});

export const useAuthComposable = () => {
    const config = useRuntimeConfig();

    const login = async ({username, password}) => {
        try {
            const res = await $fetch(`/users/login`, {
                method: 'POST',
                baseURL: config.API_BASE_URL,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    name: username,
                    password: password
                }
            });

            const {message, status, role} = res;
            if (status !== 'success') {
                authState.logged = false;
                authState.role = '';
                throw new Error(message);
            } else {
                authState.logged = true;
                authState.role = role;
                toast.success('Zalogowano');
                navigateTo('/');
            }
        } catch (e) {
            console.log(e);
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
            authState.role = res?.role;
            return {
                logged: res.logged,
                role: res?.role
            }
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
