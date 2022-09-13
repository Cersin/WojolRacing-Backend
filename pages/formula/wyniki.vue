<template>
  <div class="formula">
    <BaseHeader title="Wyniki wyścigów"/>

<!--    {{ response?.data?.track }}-->

    <div class="form">
      <BaseSelects
        label="Wyścig"
        :data="response?.data.tracks"
        v-model="selectedTrack"
        @selected="selectTrack"
      />

      <BaseSelects
        label="Sezon"
        additionalLabel="Sezon "
        :data="seasons"
        v-model="params.season"
      />
    </div>


    <BaseTable
        ref="results"
        :columns="raceColumn"
        :params="params"
        endpoint="race"
        arrayKey="results"
    ></BaseTable>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import BaseTable from "../../components/shared/BaseTable";
import BaseHeader from "../../components/shared/BaseHeader";
import BaseSelects from "../../components/shared/BaseSelects";
import seasons from "../../components/shared/data/seasons";

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
</style>
