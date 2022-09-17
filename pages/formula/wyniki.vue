<template>
  <div class="layout">
    <MainHeader/>
    <div class="formula">
      <BaseHeader title="Wyniki wyścigów"/>

  <!--    {{ response?.data?.track }}-->
      <BaseTable
          ref="results"
          :columns="raceColumn"
          :params="params"
          endpoint="race"
          arrayKey="results"
      ></BaseTable>
    </div>

    <div class="aside">
      <div class="grids">
        <BaseSelects
          class="el-col-12"
          label="Wyścig"
          dark
          :data="response?.data.tracks"
          v-model="selectedTrack"
          @selected="selectTrack"
        />

        <BaseSelects
          class="el-col-12"
          label="Sezon"
          dark
          display-value
          additionalLabel="Sezon "
          :data="seasons"
          v-model="params.season"
        />
      </div>

      <div class="margin-top circuit">
       <Circuit :date="response?.data?.date" :track="selectedTrack || response?.data?.track"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import BaseTable from "../../components/shared/BaseTable";
import BaseHeader from "../../components/shared/BaseHeader";
import BaseSelects from "../../components/shared/BaseSelects";
import seasons from "../../data/seasons";
import MainHeader from "../../components/layout/MainHeader";
import Circuit from "../../components/tracks/circuit";

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

const params = ref({
  split: 1,
  season: 1,
  number: 1
});

const results = ref();
const selectedTrack = ref();
const selectedSeason = ref(1);

const response = computed(() => {
  return results?.value?.data;
})

function selectTrack({index}) {
  params.value.number = index;
}
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
</style>
