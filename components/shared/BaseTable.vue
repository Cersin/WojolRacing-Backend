<template>
  <div class="table_wrapper">
  <table>
    <tr class="table_header">
      <th>Test1</th>
      <th>Test2</th>
      <th>Test3</th>
      <th>Test4</th>
      <th>Test4</th>
      <th>Test4</th>
      <th>Test4</th>
    </tr>

    <tr>
      <td>eee</td>
      <td>eee sas eee sas eee sas eee sas eee sas eee sas</td>
      <td>eee</td>
      <td>eee</td>
      <td>eee eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas</td>
      <td>eee eee sas </td>
      <td>eeeeee sas</td>
    </tr>

    <tr>
      <td>eee</td>
      <td>eee sas eee sas eee sas eee sas eee sas eee sas</td>
      <td>eee</td>
      <td>eee</td>
      <td>eee eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas</td>
      <td>eee eee sas </td>
      <td>eeeeee sas</td>
    </tr>

    <tr>
      <td>eee</td>
      <td>eee sas eee sas eee sas eee sas eee sas eee sas</td>
      <td>eee</td>
      <td>eee</td>
      <td>eee eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas eee sas</td>
      <td>eee eee sas </td>
      <td>eeeeee sas</td>
    </tr>
  </table>

    <div v-if="pending">
      ELO CAPTAIN JACK
    </div>
  </div>
  {{ data?.data }}
</template>

<script setup>
import {useFetch, useLazyFetch, useState} from "nuxt/app";
import { ref } from "vue"
defineProps({
  columns: {
    type: Array,
    required: true
  }
})

const params = ref({
  split: 1,
  season: 1
})

const {data, pending} = await useLazyFetch('api/race', {
  server: false,
  params: params.value
})



</script>

<style scoped lang="scss">
.table_wrapper {
  display: flex;
  max-width: 100%;
  padding: 1.5rem;
}

.table_header {
  color: $color-primary;
}

table {
  font-size: 1.3rem;
  width: 100%;
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
  padding: .5rem;
}

tr:nth-child(even) {
}

</style>