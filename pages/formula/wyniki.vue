<template>
  <div class="formula">
    <BaseHeader title="Wyniki wyścigów"/>

    {{ response?.data?.track }}

    <BaseSelects />

    <BaseTable
        ref="classification"
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

const classification = ref();

const response = computed(() => {
  return classification?.value?.data;
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
</style>
