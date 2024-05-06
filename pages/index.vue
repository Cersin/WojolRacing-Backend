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

      <div style="display: flex; justify-content:center; align-items: center;">
        <Sponsors/>
      </div>

      <a class="madeby" href="https://frontszymon.pl">v.4.1 Strona wykonana przez FRONTSZYMON.pl</a>
    </div>

    <div class="aside">
      <NavHeader aside/>
      <div style="display: flex; flex-direction: column; align-items: center;;">
        <BaseHeader black title="KARTY KIEROWCÓW"/>

        <BaseButton @click="navigateToCards" secondary style="width: 75%; margin: 2rem;">Zobacz więcej</BaseButton>

        <div class="playerCards">
          <player-card
            v-for="card in fetched"
            black
            :key="card.id"
            :name="card.player.name"
            :team="card.player.team"
            :photo="card.player.photo"
            :experience="card.experience"
            :awareness="card.awareness"
            :pace="card.pace"
            :racePace="card.racePace"
            :overall="card.overall"
            :color-first="card.firstColor"
            :color-second="card.secondColor"
            :best="card.best"
          />
        </div>
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
import {useFetch, useRuntimeConfig} from "nuxt/app";
import cardBackgrounds from "~/data/cardBackgrounds";
import cardBackgroundsSecond from "~/data/cardBackgroundsSecond";
import PlayerCard from "~/components/cards/playerCard.vue";
import BaseButton from "~/components/shared/BaseButton.vue";

const config = useRuntimeConfig()
const router = useRouter();

const {data: fetched, pending, refresh} = await useFetch('race/playerCard', {
  baseURL: config.API_BASE_URL,
  server: false,
  initialCache: false,
  transform: res => {
    const dataWithOverall =  res.data.map((el) => {
      return {
        ...el,
        firstColor: cardBackgrounds[el.player.team],
        best: false,
        secondColor: cardBackgroundsSecond[el.player.team],
        overall: calculateOverall(el.racePace, el.pace, el.awareness, el.experience)
      }
    })
    const filterByOverall = dataWithOverall.sort((a, b) => +a.overall > +b.overall ? -1 : 1 );
    filterByOverall[0].best = true;
    return filterByOverall.slice(0, 3);
  }
});

function navigateToCards() {
  router.push(`/formula/karty-gracza/`);
}

function calculateOverall(racePace, pace, awareness, experience) {
  const racePaceRate = 0.4;
  const paceRate = 0.3;
  const awarenessRate = 0.15;
  const experienceRate = 0.15;

  return (racePaceRate * +racePace)
    + (paceRate * +pace)
    + (awarenessRate * +awareness)
    + (experienceRate * +experience);
}
</script>

<style scoped lang="scss">
@import "styles/variables";

.playerCards {
  display: flex;
  gap: 3rem 6rem;
  margin-top: 2rem;
  color: white;
  flex-wrap: wrap;
  justify-content: center;

  @include tabletAndUp {
    flex-direction: column;
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
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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

  &:hover {
    color: white;
  }
}
</style>
