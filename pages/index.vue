<template>
  <div class="layout">
    <MainHeader/>
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
          route-path="/assetto"
        />
      </div>
    </div>

    <div class="aside">
      <h1>Wkrótce więcej</h1>
    </div>
  </div>


</template>

<script setup>
import FirmTitle from "../components/layout/FirmTitle";
import FirmDescription from "../components/layout/FirmDescription";
import AsideWrapper from "../components/Wrappers/AsideWrapper";
import BaseCard from "../components/container/BaseCard";
import MainHeader from "../components/layout/MainHeader";
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 300px));
  grid-gap: 10rem 10rem;
  justify-content: center;
  padding: 6rem;

  @include big-desktop() {
    margin-top: 15rem;
  }
}
</style>
