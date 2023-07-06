<template>
  <div class="playerCards_container">
    <MainHeader />

    <div class="cardDescription">
      Jak obliczamy Twój rating?
      <BaseButton class="cardDescription--button">Sprawdź</BaseButton>
    </div>

    <div class="wrap_searchbar">
      <label>Szukaj</label>
      <input type="text" v-model="searchModel">
    </div>

    <div class="playerCards">
        <player-card
          v-for="card in data"
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
</template>


<script setup lang="ts">
import MainHeader from "~/components/layout/MainHeader.vue";
import {useFetch, useRuntimeConfig} from "nuxt/app";
import {computed, ref} from "vue";

import PlayerCard from "~/components/cards/playerCard.vue";
import BaseButton from "~/components/shared/BaseButton.vue";
import BaseInput from "~/components/shared/form/BaseInput.vue";
import cardBackgrounds from "~/data/cardBackgrounds";
import cardBackgroundsSecond from "~/data/cardBackgroundsSecond";

const config = useRuntimeConfig()

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
        overall: calculateOverall(el.racePace, el.pace, el.awareness, el.experience).toFixed()
      }
    })
    const filterByOverall = dataWithOverall.sort((a, b) => +a.overall > +b.overall ? -1 : 1 );
    filterByOverall[0].best = true;
   return filterByOverall;
  }
});

const searchModel = ref('');

const data = computed(() => {
  return fetched.value.filter((el) => el.player.name.toLowerCase().includes(searchModel.value.toLowerCase()));
})

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
.search--button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  @include tabletAndUp {
    margin-left: 56px;
  }
  margin-left: 4rem;
  margin-top: 2rem;

  width: 4rem;
}

.wrap_searchbar {
  @include tabletAndUp {
    margin: 4rem 14rem;
  }
  font-size: 2rem;
  margin: 2rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: white;


  input {
    background-color: black;
    border-radius: 10px;
    border: 3px solid $color-primary;
    color: white;
    padding: 1rem;
    font-size: 1.5rem;

    &:active {
      border: 3px solid $color-primary;
    }

    &:focus {
      outline: 3px solid $color-primary;
    }
  }
}

.cardDescription {
  @include tabletAndUp {
    margin: 0 10rem;
  }

  font-size: 5rem;
  color: $color-primary;
  margin: 0 4rem;
  display: flex;
  flex-direction: column;

  &--button {
    width: 2rem;
  }
}

.playerCards {
  @include tabletAndUp {
    margin: 56px;
  }

  margin-top: 2rem;
  margin: 40px 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap:  50px;
  justify-content: center;
  align-items: center;
}

</style>