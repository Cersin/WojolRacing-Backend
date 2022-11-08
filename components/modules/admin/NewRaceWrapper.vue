<template>
  <div>
    <div class="row">
      <BaseSelects
        class="col-12 md-col-4 margin-top"
        label="Wyścig"
        dark
        display-value
        :data="Object.keys(tracks)"
        v-model="model.track"
      />

      <BaseSelects
        class="col-6 md-col-4"
        label="Sezon"
        dark
        display-value
        additionalLabel="Sezon "
        :data="seasons"
        v-model="model.season"
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

      <div class="col-6 md-col-4" style="display: flex; ">
        <Datepicker v-model="model.date" locale="pl" format="dd MM yyyy HH:mm" />
      </div>
    </div>

    <BaseTableNew
      v-model="model.results"
      :columns="raceColumn"
      :loading="loading"
      style="background-color: black"
    >
      <template #DRIVER="{rowData, rowIndex}">
        <BaseSelects
          display-label="name"
          label="Zawodnik"
          display-value
          v-model="rowData.playerDetails"
          :data="fetched?.data?.players"
          @update:modelValue="e => rowData.player = e._id"
        />
      </template>

      <template #TEAM="{rowData, rowIndex}">
        <BaseSelects
          v-model="rowData.team"
          label="Zespół"
          display-value
          :data="teamOptions"
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
    </BaseTableNew>

    <BaseButton secondary @click="submit">Dodaj</BaseButton>
  </div>
</template>

<script setup>
import BaseSelects from "../../shared/BaseSelects";
import seasons from "../../../data/seasons";
import split from "../../../data/split";
import {tracks} from "../../../data/tracks";
import {reactive, ref} from "vue";
import BaseTableOptions from "../../shared/BaseTableOptions";
import {useFetch, useRuntimeConfig} from "nuxt/app";
import BaseTableNew from "../../shared/BaseTableNew";
import BaseButton from "../../shared/BaseButton";
import {useMyFetch} from "../../../composables/useMyFetch";
import {useToast} from "vue-toastification";
import team from "../../../data/team";
import Datepicker from '@vuepic/vue-datepicker';

const toast = useToast();
const { myFetch, loading } = useMyFetch();
const config = useRuntimeConfig()

const teamOptions = ['Rezerwa', ...team];

const props = defineProps({
  modelValue: {
    type: [String, Number, Object, Array],
    default: null
  }
})

const model = reactive({
  results: [{}]
});

const selectedSplit = ref();

const emit = defineEmits(['update:modelValue', 'added']);

const {data: fetched, pending, refresh} = await useFetch('players', {
  baseURL: config.API_BASE_URL,
  server: false,
  initialCache: true
});

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

function selectSplit({value}) {
  model.split = value;
}

async function submit() {
  try {
    loading.value = true;
    await myFetch(`/race`, {
      method: 'POST',
      body: model
    }, false);
    toast.success('Wyścig został dodany');
    emit('added');
  } finally {
    loading.value = false;
  }
}

function deletePlayer(row) {
  model.results = model.results.filter(el => el !== row);
}
</script>

<style scoped>

</style>