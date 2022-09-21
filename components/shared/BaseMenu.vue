<template>
  <div @click="active = !active" class="menu" :class="{'menu--active': active, 'menu--black': aside && !active}">
    <div class="menu-button"/>
  </div>
  <div v-if="active" class="menu_overlay">
    test
  </div>


</template>

<script setup>
import { IconLogin } from "@iconify-prerendered/vue-mdi"

defineProps({
  active: {
    type: Boolean,
    default: false
  },
  aside: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  position: relative;
  height: 4rem;
  transition: transform 700ms cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 200;
}
.menu--active {
  transform: rotate(270deg);
}

.menu-button,
.menu-button::before,
.menu-button::after {
  display: block;
  background-color: $color-primary;
  position: absolute;
  height: 2px;
  width: 100%;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.menu-button::before {
  content: '';
  background-color: white;
  margin-top: -8px;
  height: 2px;
  width: 50%;
  right: 0;
}

.menu-button::after {
  content: '';
  background-color: white;
  margin-top: 8px;
  width: 80%;
  right: 0;
}

.menu--black {
  .menu-button {
    background-color: $color-grey;
  }

  .menu-button::before, .menu-button::after {
    background-color: black;
  }
}

.menu_overlay {
  position: fixed;
  left: 0;
  top: 0;
  overflow-x: hidden;
  background-color: green;
  height: 100%;
  width: 100%;
  z-index: 100;
}
</style>
