<template>
  <div class="header">
<!--    <div class="header__img"></div>-->
    <img @click="navigateTo('/')" class="header__img" src="/logo_wojol.png" alt="Wojol Racing">
    <div class="right_side">
      <button v-if="!authState.logged" @click="navigateTo('login')" class="button button--outline ripple hidden-md">ZALOGUJ</button>

      <NavHeader  class="hidden-lg"/>
    </div>
  </div>
</template>

<script setup>
import {navigateTo} from "nuxt/app";
import NavHeader from "./NavHeader";
import {useAuthComposable} from "../../composables/auth-composable";

const {authState} = useAuthComposable();


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

.hidden-lg {
  @media only screen and (min-width: $breakpoint-med) {
    display: none;
  }
}
</style>
