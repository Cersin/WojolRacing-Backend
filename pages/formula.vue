<template>
  <div class="formula">
    <BaseHeader title="Klasyfikacja generalna"/>

    <BaseTable
    :columns="[]"
    />
  </div>
</template>

<script setup>
import BaseHeader from "../components/shared/BaseHeader";
import BaseTable from "../components/shared/BaseTable";

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
</script>

<style scoped lang="scss">
.formula {
  padding: $default-padding;
  background-color: black;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 6rem;
  }
}
</style>