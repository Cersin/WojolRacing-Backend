import {reactive} from 'vue';
import {useRuntimeConfig} from "nuxt/app";

const authState = reactive({
    logged: false
});

export const useAuthComposable = () => {
    const config = useRuntimeConfig();

    const login = async ({username, password}) => {
        console.log(username);
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
            }
        } catch (e) {
            console.log(e);
        }
    }

    const auth = async () => {
        try {
            const res = await $fetch(`/users/verify`, {
                method: 'POST',
                baseURL: config.API_BASE_URL,
            });
            authState.logged = !!res.logged;
        } catch (e) {
            return e;
        }
    }

    return {
        authState,
        login,
        auth
    }
}
