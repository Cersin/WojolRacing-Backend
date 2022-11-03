<template>
  <LoadingWrapper :loading="pending || loading">
  <div class="table_wrapper">
      <table>
        <thead>
        <tr class="table_header">
          <th v-for="({ title }, index) in columns" :key="index">{{ title }}</th>
        </tr>
        </thead>

        <tbody>
          <tr v-for="(data, rowIndex) in arrayKey ? fetched?.data[arrayKey] : fetched?.data" :key="data._id">
            <td v-for="({ name, title }, index) in columns" :key="index">
              <slot :name="title" :rowIndex="rowIndex" :columnIndex="index" :rowData="data" :columnData="getNestedObject(data, splitString(name, '.'))">
                <div v-if="props.crud">
                  <BaseInput v-model="data[name]"/>
                </div>

                <div v-else>
                  {{ getNestedObject(data, splitString(name, '.')) }}
                </div>
              </slot>
            </td>
          </tr>

          <tr v-if="arrayKey ? !fetched?.data[arrayKey] : fetched?.data.length === 0">
            <td :rowspan="columns.length">Brak znalezionych danych</td>
          </tr>

        <tr v-if="crud">
          <td style="text-align: right" :colspan="columns.length">
            <IconPlusCircle @click="addRow" class="icon icon--xxxl icon--primary"/>
            <IconCheckCircle @click="emit('accept', fetched?.data)" class="icon icon--xxxl icon--success"/>
          </td>
        </tr>

        </tbody>
      </table>
  </div>
  </LoadingWrapper>
</template>

<script setup>
// slot passing
// columnData - data of column
// rowData - data of whole row
// rowIndex - row index
// columnIndex - column index

import {useFetch, useRuntimeConfig} from "nuxt/app";
import {getNestedObject, removeFalsy, splitString} from "../../utils/helpers";
import {watch} from "vue";
import LoadingWrapper from "../Wrappers/LoadingWrapper";
import BaseInput from "./form/BaseInput";
import { IconPlusCircle, IconCheckCircle } from "@iconify-prerendered/vue-mdi"

const config = useRuntimeConfig()

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  endpoint: {
    type: String,
    required: true
  },
  arrayKey: {
    type: String,
    default: null
  },
  params: {
    type: Object,
    default: () => {}
  },
  crud: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['accept']);

const {data: fetched, pending, refresh} = await useFetch(props.endpoint, {
  params: props.params,
  baseURL: config.API_BASE_URL,
  server: false,
  initialCache: false
});

function addRow() {
  props.arrayKey ? fetched.value?.data[props.arrayKey].push({}) : fetched.value?.data.push({});
}

watch(props.params, () => {
  refresh();
})

defineExpose({
  data: fetched,
  refresh
});
</script>

<style scoped lang="scss">
.table_wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 1rem 0;
  width: 100%;
  max-height: 600px;
  overflow: scroll;

}

.table_header {
  color: black;
  background-color: $color-primary;
  letter-spacing: 2px;
  font-weight: 800;
  font-size: 1.4rem;
}

tr {
  border-radius: 15px;
}

table {
  font-size: 1.3rem;
  text-align: center;
  border-spacing: 0 2rem;
}

thead {
  position: sticky;
  top: 0;
  z-index: $index-tbody;
}

th {
  padding: .8rem;
}

td {
  border-bottom: 3px solid rgba(200, 200, 200, 0.28);
  padding: 0 .8rem;
}



tr:nth-child(even) {
}

</style>
