<template>
  <button class="button" style="background-color: color-primary"><slot></slot></button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: '',
  }
})

</script>

<style scoped lang="scss">
.button {
  background-color: $color-primary;
  color: black;
  padding: .5rem 1rem;
  border: none;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>
