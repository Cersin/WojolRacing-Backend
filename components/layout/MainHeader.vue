<template>
  <div class="header">
    <img @click="navigateTo('/')" class="header__img" src="/logo_wojol.png" alt="Wojol Racing">
    <div class="right_side">
      <button
        v-if="!authState.logged"
        class="button button--outline ripple"
        :class="{'hidden-md': breakpoints}"
        @click="navigateTo('login')"
        >ZALOGUJ</button>

      <NavHeader :class="{'hidden-lg': breakpoints}" />
    </div>
  </div>
</template>

<script setup>
import {navigateTo} from "nuxt/app";
import NavHeader from "./NavHeader";
import {useAuthComposable} from "../../composables/auth-composable";

const {authState} = useAuthComposable();

defineProps({
  breakpoints: {
    type: Boolean,
    default: true
  }
})

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
