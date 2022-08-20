<template>
  <div class="table_wrapper">
      <table>
        <thead>
        <tr class="table_header">
          <th v-for="({ title }, index) in columns" :key="index">{{ title }}</th>
        </tr>
        </thead>

        <tbody>
          <tr v-for="data in key ? data.data[key] : data.data" :key="data._id">
            <td v-for="({ name, title }, index) in columns" :key="index">
              <slot :name="title" :data="data[name]">
                {{ data[name] }}
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
import {useFetch, useRuntimeConfig} from "nuxt/app";
import { ref } from "vue"

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
  key: {
    type: String,
    default: 'results'
  }
});

const params = ref({
  split: 1,
  season: 1,
  number: 1
});

const {data, pending} = await useFetch(props.endpoint, {
  params: params.value,
  baseURL: config.API_BASE_URL
});

defineExpose(data);

</script>

<style scoped lang="scss">
.table_wrapper {
  padding: 1.5rem;

  width: 100%;
  max-height: 600px;
  overflow: scroll;
}

.table_header {
  color: $color-primary;
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
  padding: .5rem;
}

tr:nth-child(even) {
}

</style>
