<template>
  <div class="layout">
    <MainHeader/>
    <div class="formula">
      <BaseHeader title="Klasyfikacja generalna"/>

      <div class="row hidden-lg">
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
            additionalLabel="Split "
            :data="split"
            v-model="params.split"
        />
      </div>

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
        <NavHeader aside/>
        <div class="row hidden-md">
          <BaseSelects
              class="col-6 md-col-4"
              label="Sezon"
              dark
              display-value
              additionalLabel="Sezon "
              :data="seasons"
              v-model="params.season"
          />

          <BaseSelects
              class="col-6 md-col-4"
              label="Split"
              dark
              display-value
              additionalLabel="Split "
              :data="split"
              v-model="params.split"
          />
        </div>
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
import NavHeader from "../../components/layout/NavHeader";

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
