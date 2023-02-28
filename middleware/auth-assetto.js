import {defineNuxtRouteMiddleware, navigateTo} from "nuxt/app";
import {useAuthComposable} from "~/composables/auth-composable";

const {authState, auth} = useAuthComposable();

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('middleware test ')
    if (!authState.logged) {
        const { role, logged } = await auth();

        if (!logged || role !== 'admin-assetto') {
            return navigateTo('/')
        }
    }
})
