<template>
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
              <slot :name="title" :rowIndex="rowIndex" :columnIndex="index" :rowData="fetched" :columnData="getNestedObject(data, splitString(name, '.'))">
                {{ getNestedObject(data, splitString(name, '.')) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
  </div>

<!--    <div v-if="pending && !data">-->
<!--      ELO CAPTAIN JACK-->
<!--    </div>-->
</template>

<script setup>
// slot passing
// columnData - data of column
// rowData - data of whole row
// rowIndex - row index
// columnIndex - column index

import {useFetch, useRuntimeConfig} from "nuxt/app";
import { getNestedObject, splitString } from "../../utils/helpers";

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
  }
});

const {data: fetched, pending} = await useFetch(props.endpoint, {
  params: props.params,
  baseURL: config.API_BASE_URL,
  server: false
});

defineExpose({
  data: fetched
});

</script>

<style scoped lang="scss">
.table_wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 2rem 0;
  width: 100%;
  max-height: 600px;
  overflow: scroll;
}

.table_header {
  color: $color-primary;
  border: 2px solid $color-primary;
}

table {
  font-size: 1.3rem;
  text-align: center;
  border-collapse: collapse;
}

th {
  border: 1px solid white;
}

td {
  border: 1px solid white;
}

td, th {
  padding: .8rem;
}

tr:nth-child(even) {
}

</style>
