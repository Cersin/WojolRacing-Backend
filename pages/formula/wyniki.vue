<template>
  <div class="layout">
    <MainHeader/>
    <div class="formula">
      <BaseHeader title="Wyniki wyścigów"/>

      <div class="row hidden-lg">
        <BaseSelects
            class="col-12 md-col-4"
            label="Wyścig"
            :data="response?.data.tracks"
            v-model="selectedTrack"
            @selected="selectTrack"
        />

        <BaseSelects
            class="col-6 md-col-4"
            label="Sezon"
            display-value
            additionalLabel="Sezon "
            :data="seasons"
            v-model="params.season"
        />

        <BaseSelects
            class="col-6 md-col-4"
            label="Split"
            display-value
            additionalLabel="Split "
            :data="split"
            v-model="params.split"
        />
      </div>

      <BaseTable
          ref="results"
          :columns="raceColumn"
          :params="params"
          endpoint="race"
          arrayKey="results"
      >
        <template #BEST="{rowData, columnData}">
          <div :class="{bestLap: rowData?.fastestLap}">
            {{ columnData }}
          </div>
        </template>
      </BaseTable>
    </div>

    <div class="aside">
      <div class="row hidden-md">
        <BaseSelects
          class="col-12 md-col-4"
          label="Wyścig"
          dark
          :data="response?.data.tracks"
          v-model="selectedTrack"
          @selected="selectTrack"
        />

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
import split from "../../data/split";
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

.bestLap {
  color: $color-primary;
}
</style>
