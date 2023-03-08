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

      <a class="madeby" href="https://frontszymon.pl">v.2.0 Strona wykonana przez FRONTSZYMON.pl</a>

      <Sponsors/>
    </div>

    <div class="aside">
      <NavHeader aside/>
      <div style="display: flex; flex-direction: column; align-items: center;;">
        <BaseHeader black title="Aktualności"/>
        <h2>Wkrótce więcej</h2>
      </div>
    </div>
  </div>


</template>

<script setup>
import FirmTitle from "../components/layout/FirmTitle";
import FirmDescription from "../components/layout/FirmDescription";
import AsideWrapper from "../components/Wrappers/AsideWrapper";
import BaseCard from "../components/container/BaseCard";
import MainHeader from "../components/layout/MainHeader";
import NavHeader from "../components/layout/NavHeader";
import BaseHeader from "../components/shared/BaseHeader";
import Sponsors from "../components/layout/Sponsors";
</script>

<style scoped lang="scss">
.home {
  min-height: 100%;
  padding: $default-padding;
  grid-area: main;
  background-color: black;
  position: relative;
  margin-bottom: 5rem;
}

.gallery {
  display: grid;
  width: 100%;
  grid-gap: 10rem 10rem;
  justify-content: center;

  @include desktop() {
    grid-template-columns: repeat(auto-fit, minmax(350px, 300px));
    margin-top: 15rem;
  }
}

.madeby {
  text-decoration: none;
  color: $color-primary;
  font-size: 1.1rem;
  position: absolute;
  bottom: 0;

  &:hover {
    color: white;
  }
}
</style>
