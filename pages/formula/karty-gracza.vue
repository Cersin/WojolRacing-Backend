<template>
  <div class="playerCards_container">
    <MainHeader />

    <div class="cardDescription--box">
      <div class="cardDescription">
        Jak obliczamy Twój rating?
      </div>

      <div class="cardDescription--small">
        W jaki sposób karta jest tworzona?
      </div>

      <div class="cardDescription-xsmall">
        Dlaczego nie widzę swojej karty?
      </div>


      <BaseButton class="cardDescription--button" @click="ratingDialog = true">Sprawdź</BaseButton>
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


    <BaseDialog v-model:open="ratingDialog">
      <template #header>
        <div class="dialog--header">
          Jak obliczamy Twój rating?
        </div>
      </template>

      <div class="dialog--box">
        <div class="dialog--description">
          Overall rating określa ogólną jakość i umiejętności danego kierowcy.
          Istnieje kilka czynników, które są brane pod uwagę przy liczeniu tych ocen*:
        </div>

        <div class="dialog--important" style="margin-top: 1rem;">
          *Dużym czynnikiem mający wpływ na punktacje ma sezon. Bieżący ma większą wagę punktową od poprzedniego.
          Całość karty generowana jest przez autorski system, a czynnik ludzki nie ma wpływu na liczby występujące na karcie.
        </div>

        <ul class="dialog--list" style="margin-top: 1rem;">
          <li>
            Experience - doświadczenie kierowcy na podstawie liczby wyścigów w jakich brał udział w naszej lidze.
            Im dłużej kierowca startuje, tym większe doświadczenie posiada.
          </li>

          <li>
            Pace - Prędkość kierowcy oceniamy na podstawie jego osiągów podczas kwalifikacji.
            Liczona na podstawie ilości wyścigów w których braliśmy udział oraz ile z nich ukończyliśmy.
          </li>

          <li>
            Awareness -  Świadomość kierowcy odnosi się do jego umiejętności rozpoznawania sytuacji na torze, unikania kolizji i reagowania na nieprzewidziane sytuacje.
            Liczona na podstawie ilości wyścigów w których braliśmy udział oraz ile z nich ukończyliśmy.
          </li>

          <li>
            Racecraft - Umiejętność wyścigowa kierowcy dotyczy taktyki i zdolności do prowadzenia emocjonujących i strategicznych walk na torze.
            Oceniona na podstawie pozycji na mecie!
          </li>

          <li>
            Overall - Jest to zsumowanie doświadczenia kierowcy, gdzie największą wagę mają następująco: Racecraft, Pace, Awareness, Experience
          </li>
        </ul>

        <div class="dialog--important" style="margin-top: 1rem;">
          Dlaczego nie widzę swojej karty?
        </div>

        <div class="dialog--description">
          Karta kierowcy zostaje wygenerowana dopiero po przejechaniu 5 wyścigów.
          Dodatkowo musisz być aktywnym kierowcą podstawy lub rezerwy.
        </div>

        <div class="dialog--important" style="margin-top: 1rem;">
          Twoja karta nie posiada zdjęcia?
        </div>

        <div class="dialog--description">
          Zrób zdjęcie i dostarcz je administracji na discordzie! Zostanie ono dodane do Twojego profilu kierowcy w systemie!
        </div>
      </div>
    </BaseDialog>
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
import BaseDialog from "~/components/shared/BaseDialog.vue";
import BaseHeader from "~/components/shared/BaseHeader.vue";
import FirmTItle from "~/components/layout/FirmTitle.vue";

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
const ratingDialog = ref(false);

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

.cardDescription--box {
  @include tabletAndUp {
    margin: 0 10rem;
  }

  margin: 0 4rem;

}

.cardDescription {
  @include tabletAndUp {
    font-size: 5rem;
  }


  font-size: 3rem;
  color: $color-primary;
  display: flex;
  flex-direction: column;

  &--button {
    width: 2rem;
    margin-top: 1rem;
  }
}

.cardDescription--small {
  @include tabletAndUp {
    font-size: 2.5rem;
  }

  font-size: 1.5rem;
  color: $color-primary;
  display: flex;
  flex-direction: column;
}

.cardDescription-xsmall {
  @include tabletAndUp {
    font-size: 1.5rem;
  }

  font-size: 1rem;
  margin-top: .5rem;
  color: $color-primary;
  display: flex;
  flex-direction: column;
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