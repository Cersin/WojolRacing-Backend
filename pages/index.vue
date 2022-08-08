<template>
  <div class="container">
    <MainHeader/>
    <slot></slot>
  </div>

</template>

<script setup>
import MainHeader from "../components/layout/MainHeader";
</script>

<style scoped lang="scss">
.container {
  height: 100%;
}
</style>
