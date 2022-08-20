<template>
  <div class="formula">
    <BaseHeader title="Klasyfikacja generalna"/>

    {{ response?.data?.track }}

    <BaseTable
        ref="classification"
        :columns="raceColumn"
        :params="params"
        endpoint="race"
        key="results"
    >
      <template #DRIVER="{data}">
        {{ data?.name || '---' }}
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
import BaseHeader from "../components/shared/BaseHeader";
import BaseTable from "../components/shared/BaseTable";
import {ref, computed} from "vue";

const raceColumn = [
    {
      title: 'POS',
      name: 'position'
    },
    {
      title: 'DRIVER',
      name: 'playerDetails'
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
  display: flex;
  flex-direction: column;
  grid-area: main;

  h1 {
    font-size: 6rem;
  }
}
</style>
