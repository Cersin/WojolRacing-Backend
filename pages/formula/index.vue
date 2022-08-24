<template>
  <div class="formula">
    <Teleport to="#aside">
      eee
    </Teleport>
    <BaseHeader title="Klasyfikacja generalna"/>

    <BaseTable
        ref="classification"
        :columns="raceColumn"
        :params="params"
        endpoint="race/playerPoints"
    >
      <template #POS="{rowIndex}">
       {{ +rowIndex + 1 }}
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
import BaseHeader from "../../components/shared/BaseHeader";
import BaseTable from "../../components/shared/BaseTable";
import {ref, computed} from "vue";

const raceColumn = [
    {
      title: 'POS',
      name: ''
    },
    {
      title: 'DRIVER',
      name: 'player.name'
    },
    {
      title: 'TEAM',
      name: 'player.team'
    }
]

const params = ref({
  split: 1,
  season: 1,
});

const classification = ref();

const response = computed(() => {
  return classification?.value?.data;
})
</script>

<style scoped lang="scss">
.formula {
  padding: $default-padding;
  background-color: black;
  display: flex;
  flex-direction: column;
  grid-area: main;

  h1 {
    font-size: 6rem;
  }
}
</style>
