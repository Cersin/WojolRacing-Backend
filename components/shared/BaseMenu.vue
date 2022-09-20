<template>
  <div class="menu" :class="{'menu--active': active}">
    <div class="menu-button"/>
  </div>

</template>

<script setup>
defineProps({
  active: {
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
  background-color: green !important;
  transition: transform 700ms cubic-bezier(0.23, 1, 0.32, 1);
}
.menu--active {
  transform: rotate(270deg);
}

.menu-button {

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
</style>
