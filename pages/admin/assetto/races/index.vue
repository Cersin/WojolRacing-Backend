<template>
  <div class="">
    <MainHeader :breakpoints="false"/>
    <div class="formula">
      <BaseHeader title="Wyniki wyścigów"/>
      <BaseButton class="margin-bottom" @click="raceDialog = true">Nowy wyścig</BaseButton>

      <div class="row">
        <BaseSelects
          class="col-6 md-col-4"
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
          :data="Object.keys(assettoSeasons)"
          v-model="params.season"
        />

        <div v-if="response?.data?.date" class="col-6 md-col-4" style="display: flex; flex-direction: column">
          Data wyścigu
          <Datepicker v-model="response.data.date" format="dd MM yyyy HH:mm" locale="pl" />
        </div>
      </div>


      <div class="margin-top">
        <div style="font-size: 2rem; display: flex; justify-content: center; align-items: center">
          {{ selectedTrack || response?.data?.track }}
        </div>
      </div>

      <BaseTable
        ref="results"
        :loading="loading"
        :columns="raceColumn"
        :params="params"
        endpoint="assetto-race"
        crud
        arrayKey="results"
        @accept="accept"
      >
        <template #DRIVER="{rowData, rowIndex}">
<!--          {{ // rowData.playerDetails }}-->
          <BaseSelects
            display-label="name"
            label="Zawodnik"
            display-value
            v-model="rowData.playerDetails"
            :data="fetched?.data?.players"
            @selected="(e) => rowData.player = e.data._id"
          />
        </template>


        <template #fastestLap?="{rowData, rowIndex}">
          <input type="checkbox" v-model="rowData.fastestLap">
        </template>

        <template #dnf?="{rowData, rowIndex}">
          <input type="checkbox" v-model="rowData.dnf">
        </template>

        <template #Opcje="{ rowData }">
          <BaseTableOptions
            :buttons="{
          delete: true
         }"
            @delete="deletePlayer(rowData)"
          />
        </template>
      </BaseTable>
    </div>


    <BaseDialog v-model:open="raceDialog" @show="model = {}">
      <template #header>
        {{ 'Dodaj nowy wyścig' }}
      </template>

      <NewAssettoRaceWrapper @added="raceAdded"/>
    </BaseDialog>

  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import BaseTable from "../../../../components/shared/BaseTable";
import BaseHeader from "../../../../components/shared/BaseHeader";
import BaseSelects from "../../../../components/shared/BaseSelects";
import split from "../../../../data/split";
import MainHeader from "../../../../components/layout/MainHeader";
import {useFetch, useRuntimeConfig} from "nuxt/app";
import BaseTableOptions from "../../../../components/shared/BaseTableOptions";
import {useMyFetch} from "../../../../composables/useMyFetch";
import {useToast} from "vue-toastification";
import BaseDialog from "../../../../components/shared/BaseDialog";
import BaseButton from "../../../../components/shared/BaseButton";
import team from "../../../../data/team";
import Datepicker from '@vuepic/vue-datepicker';
import assettoSeasons from "~/data/assettoSeasons";
import NewAssettoRaceWrapper from "~/components/modules/admin/NewAssettoRaceWrapper.vue";

definePageMeta({
  middleware: 'auth-assetto'
})

const config = useRuntimeConfig()
const { myFetch, loading } = useMyFetch();
const toast = useToast();

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
    title: 'GRID',
    name: 'grid'
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
  {
    title: 'fastestLap?',
    name: 'fastestLap'
  },
  {
    title: 'dnf?',
    name: 'dnf'
  },
  {
    title: 'Opcje',
    name: 'options'
  }
]

const teamOptions = {
  ...team,
  'Rezerwa': {
    value: 'Rezerwa'
  },
}

const {data: fetched, pending, refresh} = await useFetch('assetto-players', {
  baseURL: config.API_BASE_URL,
  server: false,
  initialCache: true
});

const params = ref({
  season: assettoSeasons["Drive Squad Super S Cup"].value,
});

const results = ref();
const selectedTrack = ref();
const selectedSplit = ref(split["1"]);
const raceDialog = ref(false);

const response = computed(() => {
  return results?.value?.data;
})

function selectTrack({index}) {
  params.value.number = index;
}

function selectSplit({value}) {
  params.value.split = value;
}

function deletePlayer(row) {
  const { data } = results.value.data;
  refresh();
}

function selectedPlayer(event) {
  console.log(event.data._id);
}

async function accept(data) {
  try {
    loading.value = true;
    await myFetch(`/assetto-race/${data._id}`, {
      method: 'PATCH',
      body: data
    }, false);
    toast.success('Wyścig został zedytowany');
  } finally {
    loading.value = false;
  }
}

function raceAdded() {
  refresh();
  raceDialog.value = false;
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
