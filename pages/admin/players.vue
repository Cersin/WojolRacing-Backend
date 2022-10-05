<template>
  <div class="layout">
    <MainHeader/>

    <div class="players">

    <BaseTable
      ref="results"
      :columns="playerColumns"
      endpoint="players"
      array-key="players"
      :params="params"
    >
      <template #Split="{columnData}">
        {{ columnData === 0 ? 'Rezerwa' : columnData }}
      </template>
      <template #Opcje="{ rowData }">
        <IconEdit class="icon icon--xl icon--primary" @click="openDialog(rowData)"></IconEdit>
        <IconTrashAlt class="icon icon--xl icon--warning margin-left--sm"></IconTrashAlt>
      </template>
    </BaseTable>
    </div>

    <div class="aside">
      <NavHeader aside/>

      <div class="row">
        <BaseSelects
          v-model="selectedSplit"
          class="col-6"
          label="Split"
          dark
          display-value
          display-label="label"
          additionalLabel="Split "
          :data="split"
          @update:model-value="selectSplit"
        />

        <BaseSelects
          v-model="params.team"
          class="col-6"
          label="Zespół"
          dark
          display-value
          :data="team"
        />
        <BaseButton class="col-12" @click="openDialog" secondary>Dodaj zawodnika</BaseButton>
      </div>
    </div>

    <BaseDialog v-model:open="playerDialog">
      <template #header>
        Dodaj ziomeczka
      </template>
      <VForm style="display: flex; flex-direction: column;" @submit="send" ref="loginForm">
        <div class="row">
          <BaseInput
            v-model="model.name"
            class="col-6 md-col-12"
            label="Imię nazwisko"
            name="name"
          />
          <BaseSelects
            v-model="playerSplit"
            class="col-6 md-col-12"
            label="Split"
            form
            dark
            display-value
            display-label="label"
            additionalLabel="Split "
            :data="split"
            @update:model-value="model.split = $event.value"
          />

          <BaseSelects
            v-model="model.team"
            class="col-6 md-col-12"
            label="Zespół"
            form
            dark
            display-value
            :data="team"
          />
        </div>

        <BaseButton class="col-3 md-col-6 margin-top" style="align-self: center" secondary>Wyślij</BaseButton>
      </VForm>
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
import split from "../../data/split";
import team from "../../data/team";
import BaseInput from "../../components/shared/form/BaseInput";
import {useMyFetch} from "../../composables/useMyFetch";
import { IconEdit, IconTrashAlt } from "@iconify-prerendered/vue-fa-regular"

const playerColumns = [
  {
    title: 'Imię Nazwisko',
    name: 'name'
  },
  {
    title: 'Team',
    name: 'team'
  },
  {
    title: 'Split',
    name: 'split'
  },
  {
    title: 'Opcje',
    name: 'options'
  }
]

const selectedSplit = ref();
const playerSplit = ref();
const loginForm = ref();

const params = ref({
  split: '',
  team: ''
});

const model = ref({});

const playerDialog = ref(false);

function selectSplit({value}) {
  params.value.split = value;
}

// function dialogOpened(player = null) {
//   player ? model.value = player : model.value = {};
// }

function openDialog(player = null) {
  console.log(player);
   player ? model.value = player : model.value = {};
   playerDialog.value = true;
}

async function send() {
    const {error} = await useMyFetch('/players', {
       method: 'POST',
       body: {
         ...model.value
       }
     })
    console.log(error.value.data);
}
</script>

<style scoped lang="scss">
.players {
  padding: $default-padding;
  grid-area: main;
}
</style>