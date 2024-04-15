<template>
  <div class="">
    <MainHeader/>
    <div class="formula-aggregate">
      <BaseHeader title="Wyniki zbiorcze"/>

      <div class="row">
        <BaseSelects
            class="col-12"
            label="Sezon"
            display-value
            :data="Object.keys(assettoSeasons)"
            v-model="params.season"
        />
      </div>

      <BaseTable
        ref="classification"
        :columns="raceColumns"
        :params="params"
        endpoint="assetto-race/detailsPoints"
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

        <template v-for="(track, index) in tracks" :key="index" #[track.track]="{rowData, columnData}">
          <div class="points_wrapper">
            <div :class="{bestLap: findAndReturnFastestLap(track, rowData.races), firstPlace: findAndReturnPosition(track, rowData.races) === 1, secondPlace: findAndReturnPosition(track, rowData.races) === 2, thirdPlace: findAndReturnPosition(track, rowData.races) === 3}">
              {{ findAndReturn(track, rowData.races) }}
            </div>
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
import assettoSeasons from "~/data/assettoSeasons";

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
      name: 'player.team'
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
        name: el.track,
        title: el.track
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
  season: assettoSeasons["GT300 Cup"].value,
});

const classification = ref();

const response = computed(() => {
  return classification?.value?.data;
})

function selectSplit({value}) {
  params.value.split = value;
}

function findAndReturn(el, searchingArray = []) {
  const findTrack = searchingArray.find(element => element.track === el.track);
  const points =  findTrack?.points;
  const dnf = findTrack?.dnf;
  if (dnf) return 'DNF';
  return points === undefined || null ? 'DNS' : points;
}

function findAndReturnFastestLap(el, searchingArray = []) {
  const findTrack = searchingArray.find(element => element.track === el.track);
  return findTrack?.fastestLap || false;
}

function findAndReturnPosition(el, searchingArray = []) {
  const findTrack = searchingArray.find(element => element.track === el.track);
  return findTrack?.position || 0;
}
</script>

<style scoped lang="scss">
.formula-aggregate {
  padding: $default-padding;
  background-color: black;
  grid-area: main;

  h1 {
    font-size: 6rem;
  }
}

.bestLap {
  border-bottom: 4px solid rgb(138, 106, 192);
}

.summary_points {
  font-weight: 800;
  font-size: 1.6rem;
}

.points_wrapper {
  display: flex;
  font-weight: 600;
  justify-content: center;
  align-items: center;
}

.firstPlace {
  background-color: #FFD700;
  color: black;
  padding: .2rem .5rem;
  border-radius: 15px;
}

.secondPlace {
  background-color: #C0C0C0;
  color: black;
  padding: .3rem;
  border-radius: 15px;
}

.thirdPlace {
  background-color: #CD7F32;
  color: black;
  padding: .3rem;
  border-radius: 15px;
}
</style>
