<template>
  <div>
    <MainHeader />

    <div class="cardDescription">
      Jak obliczamy Twój rating?
      <BaseButton class="cardDescription--button">Sprawdź</BaseButton>
    </div>

    <div class="playerCard">
        <player-card
          v-for="card in fetched"
          :key="card.id"
          :name="card.player.name"
          :team="card.player.team"
          :experience="card.experience"
          :awareness="card.awareness"
          :pace="card.pace"
          :racePace="card.racePace"
          :overall="card.overall"
        />
    </div>
  </div>
</template>


<script setup lang="ts">
import MainHeader from "~/components/layout/MainHeader.vue";
import {useFetch, useRuntimeConfig} from "nuxt/app";
import PlayerCard from "~/components/cards/playerCard.vue";
import BaseButton from "~/components/shared/BaseButton.vue";

const config = useRuntimeConfig()

const {data: fetched, pending, refresh} = await useFetch('race/playerCard', {
  baseURL: config.API_BASE_URL,
  server: false,
  initialCache: false,
  transform: res => {
    const dataWithOverall =  res.data.map((el) => {
      return {
        ...el,
        overall: calculateOverall(el.racePace, el.pace, el.awareness, el.experience).toFixed()
      }
    })
    const filterByOverall = dataWithOverall.sort((a, b) => +a.overall > +b.overall ? -1 : 1 );
    const test = dataWithOverall.filter((el) => el.player.active && el.player.team !== "Rezerwa");
    console.log(test);
    return test;
  }
});

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

.cardDescription {
  font-size: 5rem;
  color: $color-primary;
  margin-left: 11rem;
  display: flex;
  flex-direction: column;

  &--button {
    width: 2rem;
  }
}

.playerCard {
  padding: 56px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap:  50px;
  justify-content: center;
  align-items: center;
}

</style>