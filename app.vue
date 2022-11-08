<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="4" color="#FFCA00"/>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>

<script setup>
import {useFetch, useRuntimeConfig} from "nuxt/app";
import {useAuthComposable} from "./composables/auth-composable";
const config = useRuntimeConfig()

const {authState} = useAuthComposable();

const {data} = await useFetch('/users/verify', {
  baseURL: config.API_BASE_URL,
});
authState.logged = data.value?.logged;
</script>

<style scoped>

</style>