<template>
  <div style="position: relative;" class="base_container">
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.base_container {
  max-width: 2500px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  left: 50%;
  transform: translateX(-50%);
}
</style>
