<template>
  <div class="">
    <MainHeader :breakpoints="false"/>
    <div class="formula">
      <BaseHeader title="Statystyki"/>

      <div class="row">
        <BaseSelects
            class="col-6"
            label="Sezon"
            display-value
            additionalLabel="Sezon "
            :data="seasons"
            v-model="params.season"
        />

        <BaseSelects
            class="col-6"
            label="Split"
            display-value
            display-label="label"
            additionalLabel="Split "
            :data="split"
            v-model="selectedSplit"
            @update:model-value="selectSplit"
        />
      </div>

      <BaseTable
        ref="classification"
        :columns="raceColumn"
        podium
        :params="params"
        endpoint="race/playerStatistics"
      >
        <template #POS="{rowIndex}">
          {{ +rowIndex + 1 }}
        </template>

        <template #LOGO="{rowData, columnData}">
          <img v-if="team[rowData.team].img" style="width: 35px; height: auto;" :src="`/teams/${team[rowData.team].img}`" alt="team logo">
        </template>

        <template #Finished="{columnData}">
          {{ +columnData * 100 }} %
        </template>
      </BaseTable>
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
    name: 'team'
  },
  {
    title: 'LOGO',
    name: 'logo'
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
    title: 'Avg Pits',
    name: 'avgPits'
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

const selectedSplit = ref();

const params = ref({
  split: 1,
  season: 1,
});

const classification = ref();

const response = computed(() => {
  return classification?.value?.data;
})

function selectSplit({value}) {
  params.value.split = value;
}
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
