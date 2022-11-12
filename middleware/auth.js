import {defineNuxtRouteMiddleware, navigateTo} from "nuxt/app";
import {useAuthComposable} from "~/composables/auth-composable";

const {authState, auth} = useAuthComposable();

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!authState.logged) {
        const state = await auth();
        if (!state) {
            return navigateTo('/')
        }
    }
})
