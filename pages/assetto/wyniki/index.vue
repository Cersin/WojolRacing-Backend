<template>
  <div class="layout">
    <MainHeader/>
    <div class="formula">
      <BaseHeader title="Wyniki wyścigów"/>

      <div class="row hidden-lg">
        <BaseSelects
            class="col-12 md-col-6"
            label="Wyścig"
            :data="response?.data.tracks"
            :value="selectedTrack"
            @selected="selectTrack"
        />

        <BaseSelects
            class="col-12 md-col-6"
            label="Sezon"
            display-value
            :data="Object.keys(assettoSeasons)"
            v-model="params.season"
        />
      </div>

      <BaseTable
          ref="results"
          :columns="raceColumn"
          :params="params"
          endpoint="assetto-race"
          podium
          arrayKey="results"
      >
        <template #BEST="{rowData, columnData}">
          <div :class="{bestLap: rowData?.fastestLap}">
            {{ columnData }}
          </div>
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
          class="col-12 md-col-6 margin-top"
          label="Wyścig"
          dark
          display-value
          :data="response?.data.tracks"
          v-model="selectedTrack"
          @selected="selectTrack"
        />

        <BaseSelects
          class="col-12 md-col-6"
          label="Sezon"
          dark
          display-value
          :data="Object.keys(assettoSeasons)"
          v-model="params.season"
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
import assettoSeasons from "~/data/assettoSeasons";


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
    name: 'playerDetails.team'
  },
  {
    title: 'GRID',
    name: 'grid'
  },
  {
    title: 'BEST',
    name: 'bestLap'
  },
  {
    title: 'TOTAL TIME',
    name: 'gap'
  },
  {
    title: 'PTS',
    name: 'points'
  },
]

const params = ref({
  season: assettoSeasons["GT300 Cup"].value,
  number: 0
});

const results = ref();
const selectedTrack = ref();

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
  router.push(`/assetto/wyniki/${response.value?.data?._id}`);
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
