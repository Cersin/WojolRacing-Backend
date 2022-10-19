<template>
  <BaseSelects
    :key="key"
    label="Zawodnik"
    display-label="name"
    display-value
    :data="fetched?.data?.players"
    v-model="modelValue"
    @update:model-value="emit('select')"

  />
</template>

<script setup>
import BaseSelects from "../BaseSelects";
import {computed} from "vue";
import {useFetch, useRuntimeConfig} from "nuxt/app";

const config = useRuntimeConfig()

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Object, Array],
    default: null
  },
  key: {
    type: [String, Number],
    default: ""
  }
})

const {data: fetched, pending, refresh} = await useFetch('players', {
  baseURL: config.API_BASE_URL,
  server: false,
  initialCache: true
});


const emit = defineEmits(['select', 'update:modelValue']);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue')
});

</script>

<style scoped>

</style>