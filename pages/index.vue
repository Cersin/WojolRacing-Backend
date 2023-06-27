<template>
  <div class="layout">
    <MainHeader/>
    <div class="home">
      <div class="margin-bottom margin-top">
        <FirmTitle class="margin-bottom"/>
        <FirmDescription/>
      </div>


      <div class="personal-card">
        <div class="personal-card--borders" />

        <div class="personal-card--borders-2" />
        <div class="personal-card--borders-3" />
        <div class="personal-card--borders-4" />


        <div class="personal-card--container">
          <div class="personal-card--logo"><img src="/logo_wojol.png"/> </div>
          <img src="/personalcard/person_white.png"/>
          <div class="personal-card--team">
            <div class="personal-card--number">99</div>
            REDBULL RACING
          </div>
          <div class="personal-card--nick">Robert Adam</div>
          <div class="personal-card--statistics">
            <div class="personal-card--arrow"/>
            <div class="personal-card--arrow-2"/>
            <div class="personal-card--stat">
              <div class="personal-card--rate">99</div>
              <div class="personal-card--description">EXP</div>
            </div>

            <div class="personal-card--stat">
              <div class="personal-card--rate">99</div>
              <div class="personal-card--description">RAC</div>
            </div>

            <div class="personal-card--stat">
              <div class="personal-card--rate">99</div>
              <div class="personal-card--description">AWA</div>
            </div>

            <div class="personal-card--stat">
              <div class="personal-card--rate">99</div>
              <div class="personal-card--description">PAC</div>
            </div>
            </div>

        </div>

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

      <a class="madeby" href="https://frontszymon.pl">v.2.2 Strona wykonana przez FRONTSZYMON.pl</a>

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

@import "styles/variables";

.personal-card {
  width: 225px;
  height: 300px;
  position: relative;
  z-index: 999;
  -webkit-filter: blur(.5px);
  -moz-filter: blur(.5px);
  -o-filter: blur(.5px);
  -ms-filter: blur(.5px);
  filter: blur(.5px);
}

.personal-card--container {
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(13, 15, 21, 1) 4%, rgba(40, 75, 105, 1) 100%);
  clip-path: polygon(18.3% 0%, 100% 0%, 100% 12.3%, 100% 87.7%, 100.4% 100%, 0% 100%, 0% 78.8%, 0% 15.1%);
  border-color: white;
  border: solid;
  border-width: 0 0px 3px 3px;
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;

  img {
    width: 50%;
  }

  .personal-card--number {
    position: absolute;
    bottom: 44%;
    right: 25%;
    padding: 4px 11px;
    border-radius: 14px;
    background-color: $color-primary;
    font-size: 24px;
    color: black;
    opacity: 0.7;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.personal-card--logo {
  position: absolute;
  top: 0;
  right: 3%;
  width: 75px;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}

.personal-card:before {
  content: "";
  position: absolute;
  top: 3%;
  left: 9%;
  width: 3px;
  height: 15px;
  transform: rotate(45deg);
  background-color: white;
}

.personal-card--borders {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0%;
  left: 3%;
  border: solid $color-primary;
  border-width: 8px 0 0 8px;
  clip-path: polygon(0 0, 100% 0%, 100% 5%, 0 100%);
  z-index: 900;
}

.personal-card--borders-2 {
  position: absolute;
  width: 50px;
  height: 55px;
  top: -11px;
  left: -5px;
  border: solid $color-primary;
  border-width: 8px 0 0 8px;
  clip-path: polygon(0 0, 100% 0%, 100% 5%, 0 100%);
  z-index: 900;
}

.personal-card--borders-3 {
  position: absolute;
  width: 50px;
  height: 100%;
  right: 0;
  top: -10px;
  border: solid $color-primary;
  border-width: 0 8px 0 0;
  clip-path: polygon(82% 0, 100% 3%, 100% 85%, 0 100%, 0 0);
  z-index: 900;
}

.personal-card--borders-4 {
  position: absolute;
  width: 50px;
  height: 92%;
  right: -15px;
  top: 0;
  border: solid $color-primary;
  border-width: 0 8px 0 0;
  clip-path: polygon(82% 0, 100% 3%, 100% 85%, 0 100%, 0 0);
  z-index: 900;
}

.personal-card--team {
  margin-top: 16px;
  font-size: 9px;
  font-weight: 400px;
}

.personal-card--nick {
  margin-top: 16px;
  font-size: 18px;
}

.personal-card--statistics {
  display: flex;
  margin-top: 3px;
  flex-direction: row;
  position: relative;
  width: 75%;
  justify-content: space-evenly;
  background-color: #2e2e2e;
  padding: 4px;
  //clip-path: polygon(10% 0, 100% 0, 100% 60%, 100% 100%, 0 100%, 0% 60%, 0 18%);



  //.personal-card--statistics-cut-2 {
  //  position: absolute;
  //  top: 7%;
  //  z-index: 999;
  //  left: -1%;
  //  width: 16px;
  //  height: 5px;
  //  transform: rotate(-45deg);
  //  background-color: #1a3349;
  //}

  .personal-card--arrow {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 12px;
    height: 12px;
    border: $color-primary solid;
    border-width: 2.7px 2.7px 0 0;
    transform: rotate(90deg);
  }

  .personal-card--arrow-2 {
    position: absolute;
    bottom: -7px;
    right: -7px;
    width: 12px;
    height: 12px;
    border: $color-primary solid;
    border-width: 2.7px 2.7px 0 0;
    transform: rotate(90deg);
  }

  .personal-card--stat {
    display: flex;
    flex-direction: column;
    gap: 3px;
    text-align: center;
    opacity: 0.8;

    .personal-card--rate {
      font-size: 22px;
    }

    .personal-card--description {
      font-size: 12px;
    }
  }
}



@keyframes shine{
  10% {
    opacity: 1;
    transition-property: left, top, opacity;
    transition-duration: 0.7s, 0.7s, 0.15s;
    transition-timing-function: ease;
  }
  100% {
    opacity: 0;
    transition-property: left, top, opacity;
  }
}


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
    grid-template-columns: repeat(auto-fit, minmax(225px, 300px));
    margin-top: 6rem;
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
