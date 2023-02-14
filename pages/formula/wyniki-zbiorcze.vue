<template>
  <div class="">
    <MainHeader/>
    <div class="formula">
      <BaseHeader title="Wyniki zbiorcze"/>

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
        :columns="raceColumns"
        podium
        :params="params"
        endpoint="race/detailsPoints"
      >
        <template #POS="{rowIndex}">
          {{ +rowIndex + 1 }}
        </template>

        <template #Suma="{columnData}">
          <div class="summary_points">
            {{ columnData }}
          </div>
        </template>

        <template #Strata="{rowIndex, columnData}">
          {{ rowIndex === 0 ? '-' : (response.data[0]?.points - response.data[rowIndex]?.points) || 0 }}
        </template>


        <template #LOGO="{rowData, columnData}">
          <img v-if="team[rowData.team].img" class="logo" :src="`/teams/${team[rowData.team].img}`" alt="team logo">
        </template>

        <template v-for="(track, index) in tracks" :key="index" #[track]="{rowData, columnData}">
          <div :class="{bestLap: findAndReturnFastestLap(track, rowData.races)}">
            {{ findAndReturn(track, rowData.races) }}
          </div>
        </template>

      </BaseTable>

      <button class="button button--outline ripple margin-bottom"
              @click="saveImage('table', `klasyfikacja-split${params.split}-season${params.season}`)">
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
import NavHeader from "../../components/layout/NavHeader";
import team from "../../data/team";
import useImage from "../../hooks/useImage";

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
      name: 'team'
    },
    {
      title: 'LOGO',
      name: 'logo'
    },
    {
      title: 'Points',
      name: 'points'
    }
]

const raceColumns = computed(() => {
  let mergeColumns = [
    ...raceColumn
  ];

  if(classification?.value?.data?.tracks) {
    const tracks = classification?.value?.data?.tracks.map((el) => {
      return {
        name: el,
        title: el
      }
    })

    mergeColumns = [
      ...raceColumn.slice(0, -1),
      ...tracks,
      {
        title: 'Suma',
        name: 'points'
      },
      {
        title: 'Strata',
        name: 'loss'
      }
    ]
  }

  return mergeColumns;
});

const tracks = computed(() => {
  return classification?.value?.data?.tracks;
});

const selectedSplit = ref(split["1"]);

const params = ref({
  split: 1,
  season: 2,
});

const classification = ref();

const response = computed(() => {
  return classification?.value?.data;
})

function selectSplit({value}) {
  params.value.split = value;
}

function findAndReturn(el, searchingArray = []) {
  const findTrack = searchingArray.find(element => element.track === el);
  return findTrack?.points || 0;
}

function findAndReturnFastestLap(el, searchingArray = []) {
  const findTrack = searchingArray.find(element => element.track === el);
  return findTrack?.fastestLap || false;
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

.bestLap {
  color: rgb(103, 78, 146);
  font-weight: 600;
  font-size: 1.5rem;
}

.summary_points {
  font-weight: 600;
  font-size: 1.6rem;
}
</style>
