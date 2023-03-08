<template>
  <div class="">
    <MainHeader />
    <div class="formula">
      <BaseHeader title="Statystyki"/>

      <div class="row">
        <BaseSelects
            class="col-12"
            label="Sezon"
            display-value
            :data="Object.keys(assettoSeasons)"
            v-model="params.season"
        />
      </div>

      <BaseTable
        ref="classification"
        :columns="raceColumn"
        podium
        :params="params"
        endpoint="assetto-race/playerStatistics"
      >
        <template #POS="{rowIndex}">
          {{ +rowIndex + 1 }}
        </template>

        <template #Finished="{columnData}">
          {{ (+columnData * 100).toFixed(0) }} %
        </template>
      </BaseTable>

      <button class="button button--outline ripple margin-bottom"
              @click="saveImage('table', `statystyki-split${params.split}-season${params.season}`)">
        Zapisz zdjęcie tabelki
      </button>
    </div>
  </div>

</template>

<script setup>
import BaseHeader from "../../components/shared/BaseHeader";
import BaseTable from "../../components/shared/BaseTable";
import {ref, computed} from "vue";
import MainHeader from "../../components/layout/MainHeader";
import seasons from "../../data/seasons";
import split from "../../data/split";
import BaseSelects from "../../components/shared/BaseSelects";
import team from "../../data/team";
import useImage from "../../hooks/useImage";
import assettoSeasons from "~/data/assettoSeasons";

const {saveImage} = useImage();

const raceColumn = [
  {
    title: 'POS',
    name: ''
  },
  {
    title: 'DRIVER',
    name: 'player.name'
  },
  {
    title: 'TEAM',
    name: 'player.team'
  },
  {
    title: 'PTS',
    name: 'points'
  },
  {
    title: 'TOP1',
    name: 'firstPlaces'
  },
  {
    title: 'TOP3',
    name: 'podiums'
  },
  {
    title: 'TOP10',
    name: 'top10'
  },
  {
    title: 'Fastest laps',
    name: 'fastestLaps'
  },
  {
    title: 'POLE',
    name: 'top1Grid'
  },
  {
    title: 'TOP3 GRID',
    name: 'top3Grid'
  },
  {
    title: 'TOP10 GRID',
    name: 'top10Grid'
  },
  {
    title: 'Avg Grid',
    name: 'avgStartGrid'
  },
  {
    title: 'Avg Position',
    name: 'avgPosition'
  },
  {
    title: 'Race Gain',
    name: 'gain'
  },
  {
    title: 'Races',
    name: 'races'
  },
  {
    title: 'Finished',
    name: 'percentageFinished'
  },
  {
    title: 'DNFs',
    name: 'DNFs'
  },
]


const params = ref({
  season: assettoSeasons["Drive Squad Super S Cup"].value,
});

const classification = ref();

const response = computed(() => {
  return classification?.value?.data;
})

</script>

<style scoped lang="scss">
.formula {
  padding: $default-padding;
  background-color: black;

  h1 {
    font-size: 6rem;
  }
}
</style>
