<template>
  <div class="header">
<!--    <div class="header__img"></div>-->
    <img @click="navigateTo('/')" class="header__img" src="logo_wojol.png" alt="Wojol Racing">
    <button class="button button--outline ripple">ZALOGUJ</button>
  </div>
</template>

<script setup>
import {navigateTo} from "nuxt/app";
</script>

<style scoped lang="scss">
.header {
  grid-area: head;
  padding: $default-padding;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__img {
    height: 100px;
    width: auto;
    cursor: pointer;
  }
}
</style>
