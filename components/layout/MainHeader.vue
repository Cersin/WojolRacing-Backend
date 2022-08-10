<template>
  <div class="header">
    <img class="header__img" src="logo_wojol.png" alt="Wojol Racing">
    <button class="button button--outline ripple">ZALOGUJ</button>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
}
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
    height: 100%;
    width: auto;
  }
}
</style>
