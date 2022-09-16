<template>
  <div class="layout">
    <MainHeader/>
    <div class="formula">
      <BaseHeader title="Klasyfikacja generalna"/>

      <BaseTable
        ref="classification"
        :columns="raceColumn"
        :params="params"
        endpoint="race/playerPoints"
      >
        <template #POS="{rowIndex}">
          {{ +rowIndex + 1 }}
        </template>
      </BaseTable>
    </div>

    <div class="aside">
      <h1>Wkrótce więcej</h1>
    </div>
  </div>

</template>

<script setup>
import BaseHeader from "../../components/shared/BaseHeader";
import BaseTable from "../../components/shared/BaseTable";
import {ref, computed} from "vue";
import MainHeader from "../../components/layout/MainHeader";

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
    title: 'Points',
    name: 'points'
  }
]

const params = ref({
  split: 1,
  season: 1,
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
