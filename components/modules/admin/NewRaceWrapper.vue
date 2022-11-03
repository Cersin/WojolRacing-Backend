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
        v-model="model.split"
      />
    </div>

    <BaseTable
      ref="results"
      :columns="raceColumn"
      v-model="model.results"
      style="background-color: black"
      crud
      :fetch="false"
      arrayKey="results"
      endpoint="race"
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
        />
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
</template>

<script setup>
import BaseSelects from "../../shared/BaseSelects";
import seasons from "../../../data/seasons";
import split from "../../../data/split";
import {tracks} from "../../../data/tracks";
import {computed, ref} from "vue";
import BaseTable from "../../shared/BaseTable";
import BaseTableOptions from "../../shared/BaseTableOptions";
import {useFetch, useRuntimeConfig} from "nuxt/app";

const config = useRuntimeConfig()

const props = defineProps({
  modelValue: {
    type: [String, Number, Object, Array],
    default: null
  }
})

const emit = defineEmits(['update:modelValue']);

const {data: fetched, pending, refresh} = await useFetch('players', {
  baseURL: config.API_BASE_URL,
  server: false,
  initialCache: true
});

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
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
    title: 'Opcje',
    name: 'options'
  }
]

const results = ref();

async function accept(data) {
  try {
    console.log('eee');
    console.log(data);
  } finally {
  }
}

function deletePlayer(row) {
  // console.log(results.value.data);
  // console.log(results.value);
  console.log(results.value);
  // const { data } = results.value.data;
  // console.log(data);
  // console.log(results.value);
  // data.results = data.results.filter(el => el !== row);
}
</script>

<style scoped>

</style>