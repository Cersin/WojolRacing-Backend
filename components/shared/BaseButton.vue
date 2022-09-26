<template>
  <div v-bind="$attrs" style="display: flex;">
    <button @click="emit('click')" class="button" :class="{'button--secondary': secondary}"><slot></slot></button>
  </div>
</template>

<script setup>
defineProps({
  secondary: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

</script>

<style scoped lang="scss">
</style>
