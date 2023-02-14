<template>
  <div class="layout">
    <MainHeader/>
    <div class="formula">
      <BaseHeader :title="`Wyniki ${response?.data?.track} S${response?.data?.season}/F${response?.data?.split}`"/>
      <BaseTable
        ref="results"
        :columns="raceColumn"
        :endpoint="`race/${raceId}`"
        podium
        arrayKey="results"
      >
        <template #BEST="{rowData, columnData}">
          <div :class="{bestLap: rowData?.fastestLap}">
            {{ columnData }}
          </div>
        </template>

        <template #LOGO="{rowData, columnData}">
          <img v-if="team[rowData.team].img" class="logo" :src="`/teams/${team[rowData.team].img}`" alt="team logo">
        </template>
      </BaseTable>

      <div v-if="response?.data?.length" style="display: flex; gap: 1rem;">
        <button class="button button--outline ripple margin-bottom"
                @click="saveImage('table', `${response.data.track}`)">
          Zapisz zdjęcie tabelki
        </button>
      </div>
    </div>

    <div class="aside">
      <NavHeader aside/>

      <div class="margin-top circuit">
        <Circuit :date="response?.data?.date" :track="response?.data?.track"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import BaseTable from "../../../components/shared/BaseTable";
import BaseHeader from "../../../components/shared/BaseHeader";
import MainHeader from "../../../components/layout/MainHeader";
import Circuit from "../../../components/tracks/circuit";
import NavHeader from "../../../components/layout/NavHeader";
import team from "../../../data/team";
import useImage from "../../../hooks/useImage";


const {saveImage} = useImage();
const route = useRoute();

const raceColumn = [
  {
    title: 'POS',
    name: 'position'
  },
  {
    title: 'DRIVER',
    name: 'playerDetails.name'
  },
  {
    title: 'TEAM',
    name: 'team'
  },
  {
    title: 'LOGO',
    name: 'logo'
  },
  {
    title: 'GRID',
    name: 'grid'
  },
  {
    title: 'STOPS',
    name: 'pitStops'
  },
  {
    title: 'BEST',
    name: 'bestLap'
  },
  {
    title: 'GAP',
    name: 'gap'
  },
  {
    title: 'PTS',
    name: 'points'
  },
]

const results = ref();
const selectedTrack = ref();

const response = computed(() => {
  return results?.value?.data;
})


const raceId = computed(() => {
  return route.params?.id;
})

watch(() => response.value, value => {
  selectedTrack.value = value?.data?.track;
})


</script>

<style scoped lang="scss">
.formula {
  padding: $default-padding;
  background-color: black;
  grid-area: main;

  h1 {
    font-size: 6rem;
  }
}

.selectors {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circuit {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 2rem;
}

.bestLap {
  color: $color-best-lap;
}
</style>
