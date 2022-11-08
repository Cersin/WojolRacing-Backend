<template>
  <LoadingWrapper :loading="loading">
  <div class="table_wrapper">
      <table>
        <thead>
        <tr class="table_header">
          <th v-for="({ title }, index) in columns" :key="index">{{ title }}</th>
        </tr>
        </thead>

        <tbody>
          <tr v-for="(data, rowIndex) in model" :key="rowIndex">
            <td v-for="({ name, title }, index) in columns" :key="index">
              <slot :name="title" :rowIndex="rowIndex" :columnIndex="index" :rowData="data" :columnData="getNestedObject(data, splitString(name, '.'))">
                <div>
                  <BaseInput v-model="data[name]"/>
                </div>
              </slot>
            </td>
          </tr>

          <tr v-if="!model.length">
            <td :rowspan="columns.length">Brak danych</td>
          </tr>

        <tr>
          <td style="text-align: right" :colspan="columns.length">
            <IconPlusCircle @click="addRow" class="icon icon--xxxl icon--primary"/>
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
import {computed, watch} from "vue";
import LoadingWrapper from "../Wrappers/LoadingWrapper";
import BaseInput from "./form/BaseInput";
import { IconPlusCircle, IconCheckCircle } from "@iconify-prerendered/vue-mdi"

const config = useRuntimeConfig()

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [Object, Array],
    default: () => []
  }
});

const emit = defineEmits(['accept', 'update:modelValue']);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

function addRow() {
  model.value.push({});
}
</script>

<style scoped lang="scss">

</style>
