<template>
  <AsideWrapper>
    Test
  </AsideWrapper>
  <div class="home">
    <div class="margin-bottom margin-top">
      <FirmTitle class="margin-bottom"/>
      <FirmDescription/>
    </div>

    <div class="gallery margin-bottom">
      <BaseCard
        title="Wojol Racing F1 League"
        image-path="formula.png"
        route-path="/formula"
      />

      <BaseCard
        title="Assetto Corsa"
        image-path="assettocorsa.jpeg"
        route-path="/formula"
      />
    </div>
  </div>

</template>

<script setup>
import FirmTitle from "../components/layout/FirmTitle";
import FirmDescription from "../components/layout/FirmDescription";
import AsideWrapper from "../components/Wrappers/AsideWrapper";
import BaseCard from "../components/container/BaseCard";
</script>

<style scoped lang="scss">
.home {
  min-height: 100%;
  padding: $default-padding;
  grid-area: main;
  background-color: black;
}

.gallery {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(150px, 300px));
  grid-gap: 10rem 10rem;
  margin-top: 60px;
  justify-content: center;

}
</style>
