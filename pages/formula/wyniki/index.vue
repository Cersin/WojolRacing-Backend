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
            :value="selectedTrack"
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
            display-label="label"
            additionalLabel="Split "
            :data="split"
            v-model="selectedSplit"
            @update:model-value="selectSplit"
        />
      </div>

      <BaseTable
          ref="results"
          :columns="raceColumn"
          :params="params"
          endpoint="race"
          podium
          arrayKey="results"
      >
        <template #BEST="{rowData, columnData}">
          <div :class="{bestLap: rowData?.fastestLap}">
            {{ columnData }}
          </div>
        </template>

        <template #LOGO="{rowData, columnData}">
            <img v-if="team[rowData.team].img" class="logo" :src="`/teams/${team[rowData.team].img}`" alt="team logo">
        </template>
      </BaseTable>

      <div v-if="response?.data?.length" style="display: flex; gap: 1rem;">
        <button class="button button--outline ripple margin-bottom"
                @click="openRace">
          Otwórz w osobnym linku
        </button>

        <button class="button button--outline ripple margin-bottom"
                @click="saveImage('table', `${response.data.track}-split${params.split}-season${params.season}`)">
          Zapisz zdjęcie tabelki
        </button>
      </div>

    </div>

    <div class="aside">
      <NavHeader aside/>
      <div class="row hidden-md">
        <BaseSelects
          class="col-12 md-col-4 margin-top"
          label="Wyścig"
          dark
          display-value
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
            display-label="label"
            additionalLabel="Split "
            :data="split"
            v-model="selectedSplit"
            @update:model-value="selectSplit"
        />
      </div>

      <div class="margin-top circuit">
       <Circuit :date="response?.data?.date" :track="selectedTrack || response?.data?.track"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import BaseTable from "../../../components/shared/BaseTable";
import BaseHeader from "../../../components/shared/BaseHeader";
import BaseSelects from "../../../components/shared/BaseSelects";
import seasons from "../../../data/seasons";
import split from "../../../data/split";
import MainHeader from "../../../components/layout/MainHeader";
import Circuit from "../../../components/tracks/circuit";
import NavHeader from "../../../components/layout/NavHeader";
import team from "../../../data/team";
import useImage from "../../../hooks/useImage";


const {saveImage} = useImage();
const router = useRouter();

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
    title: 'LOGO',
    name: 'logo'
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
  season: 3,
  number: 0
});

const results = ref();
const selectedTrack = ref();
const selectedSplit = ref(split["1"]);

const response = computed(() => {
  return results?.value?.data;
})

watch(() => response.value, value => {
  selectedTrack.value = value?.data?.track;
})

function selectTrack({index}) {
  params.value.number = index;
}

function selectSplit({value}) {
  params.value.split = value;
}

function openRace() {
  router.push(`/formula/wyniki/${response.value?.data?._id}`);
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
  color: $color-best-lap;
}
</style>
