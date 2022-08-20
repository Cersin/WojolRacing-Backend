<template>
  <div class="layout">
    <MainHeader/>
    <AsideWrapper>
      <h1>Wkrótce więcej</h1>
    </AsideWrapper>
    <slot></slot>
  </div>

</template>

<script setup>

import MainHeader from "../components/layout/MainHeader";
import AsideWrapper from "../components/Wrappers/AsideWrapper";
</script>

<style scoped lang="scss">
.layout {
  display: grid;
  min-height: 100vh;

  grid-template-areas:
                      "head"
                      "main"
                      "aside";
  grid-template-rows: 100px auto auto;
  grid-template-columns: 100%;

  @include tabletAndUp {
    grid-template-areas:
                      "head aside"
                      "main aside";
    grid-template-columns: .75fr auto;
    grid-template-rows: 100px 1fr;
  }
}

</style>
