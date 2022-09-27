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
    />
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

        <BaseButton class="col-12" @click="playerDialog = true" secondary>Dodaj zawodnika</BaseButton>
      </div>
    </div>

    <BaseDialog v-model:open="playerDialog">
      <template #header>
        Dodaj ziomeczka
      </template>
      <VForm style="display: flex; flex-direction: column;" @submit="login" ref="loginForm">
        <BaseInput
          v-model="player.name"
          label="Nazwa"
          name="username"
          rules="required"
        />

        <BaseInput
          v-model="player.password"
          label="Hasło"
          name="Split"
          rules="required"
        />
        <button class="button button--outline ripple">ZALOGUJ</button>
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

const selectedSplit = ref();

const params = ref({
  split: '',
  team: ''
});


const player = ref({});

const playerDialog = ref(false);

function selectSplit({value}) {
  params.value.split = value;
}
</script>

<style scoped lang="scss">
.players {
  padding: $default-padding;
  grid-area: main;

}
</style>