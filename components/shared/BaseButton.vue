<template>
  <div v-bind="$attrs" style="display: flex; flex: 1;" >
    <button @click="emit('click')" class="button" :class="{'button--secondary': secondary}" style="flex: 1;"><slot></slot></button>
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
