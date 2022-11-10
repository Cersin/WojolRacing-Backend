import {defineNuxtRouteMiddleware, navigateTo} from "nuxt/app";
import {useAuthComposable} from "~/composables/auth-composable";

const {authState, auth} = useAuthComposable();

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!authState.logged) {
        console.log('test');
        const state = await auth();
        console.log(state);
        if (!state) {
            return navigateTo('/')
        }
    }
})