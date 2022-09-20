<template>
  <div class="header">
<!--    <div class="header__img"></div>-->
    <img @click="navigateTo('/')" class="header__img" src="/logo_wojol.png" alt="Wojol Racing">
    <div class="right_side">
      <button class="button button--outline ripple">ZALOGUJ</button>

      <BaseMenu :active="active"/>
    </div>
  </div>
</template>

<script setup>
import {navigateTo} from "nuxt/app";
import BaseMenu from "../shared/BaseMenu";
import {ref} from "vue";

const active = ref(false);
</script>

<style scoped lang="scss">
.header {
  grid-area: head;
  padding: $default-padding;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__img {
    height: 100px;
    width: auto;
    cursor: pointer;
  }
}

.right_side {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
}
</style>
