<template>
  <div class="layout">
    <MainHeader/>

    <div class="players">

    <BaseTable
      ref="results"
      :columns="playerColumns"
      endpoint="players"
      array-key="players"
    />
    </div>

    <div class="aside">
      <NavHeader aside/>

      <div class="row">
        <BaseSelects
          class="col-12"
          label="Sezon"
          dark
          display-value
          additionalLabel="Sezon "
        />
<!--        <div class="col-12" style="display: flex;">-->
<!--          <button @click="playerDialog = true" class="button button&#45;&#45;secondary">Dodaj zawodnika</button>-->
<!--        </div>-->
<!--        <button @click="playerDialog = true" class="button button&#45;&#45;secondary col-12">Dodaj zawodnika</button>-->
        <BaseButton class="col-12" @click="playerDialog = true" secondary>Dodaj zawodnika</BaseButton>
      </div>
    </div>

    <BaseDialog v-model:open="playerDialog">
      <template #header>
        Dodaj ziomeczka
      </template>
    </BaseDialog>
  </div>
</template>

<script setup>
import MainHeader from "../../components/layout/MainHeader";
import NavHeader from "../../components/layout/NavHeader";
import BaseTable from "../../components/shared/BaseTable";
import BaseDialog from "../../components/shared/BaseDialog";
import {ref} from "vue";
import BaseSelects from "../../components/shared/BaseSelects";
import BaseButton from "../../components/shared/BaseButton";

const playerColumns = [
  {
    title: 'IMIĘ NAZWISKO',
    name: 'name'
  },
  {
    title: 'TEAM',
    name: 'team'
  },
  {
    title: 'SPLIT',
    name: 'split'
  },
]

const playerDialog = ref(false);

function f() {

}

</script>

<style scoped lang="scss">
.players {
  padding: $default-padding;
  grid-area: main;

}
</style>