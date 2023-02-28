<template>
  <div class="layout">
    <MainHeader/>

    <div class="players">

    <BaseTable
      ref="playersRef"
      :columns="playerColumns"
      endpoint="assetto-players"
      array-key="players"
      :params="params"
    >
      <template #Split="{columnData}">
        {{ columnData === 0 ? 'Rezerwa' : columnData }}
      </template>
      <template #Opcje="{ rowData }">
        <BaseTableOptions
         :buttons="{
          edit: true,
          delete: true
         }"
         @delete="deletePlayer(rowData)"
         @edit="openDialog(rowData)"
        />
      </template>
    </BaseTable>
    </div>

    <div class="aside">
      <NavHeader aside/>

      <div class="row">
        <BaseSelects
          v-model="selectedSeason"
          class="col-12"
          label="Sezon"
          dark
          display-value
          display-label="label"
          :data="assettoSeasons"
          @update:model-value="selectSeason"
        />

        <BaseButton class="col-12" @click="openDialog" secondary>Dodaj zawodnika</BaseButton>
      </div>
    </div>

    <BaseDialog v-model:open="playerDialog">
      <template #header>
        {{ editMode ? 'Edytuj ziomeczka' : 'Dodaj ziomeczka' }}
      </template>

      <LoadingWrapper :loading="loading">
        <VForm class="form--wrapper" style="display: flex; flex-direction: column;" as="div" ref="loginForm">
          <div class="row">
            <BaseInput
              v-model="model.name"
              class="col-6 md-col-12"
              label="Imię nazwisko"
              name="name"
              rules="required"
            />

            <ValidationWrapper
              class="col-6 md-col-12"
              :value="model.season"
              label="Split"
              name="split"
              rules="required"
            >
              <BaseSelects
                v-model="model.season"
                label="Zespół"
                form
                dark
                display-value
                :data="Object.keys(assettoSeasons)"
              />
            </ValidationWrapper>

            <BaseInput
              v-model="model.team"
              class="col-6 md-col-12"
              label="Zespół"
              name="team"
              rules="required"
            />

          </div>

          <BaseButton @click="send()" class="col-3 md-col-6 margin-top" style="align-self: center" secondary>Wyślij</BaseButton>
        </VForm>
      </LoadingWrapper>
    </BaseDialog>
  </div>
</template>

<script setup>
import MainHeader from "../../../components/layout/MainHeader";
import NavHeader from "../../../components/layout/NavHeader";
import BaseTable from "../../../components/shared/BaseTable";
import BaseDialog from "../../../components/shared/BaseDialog";
import {ref} from "vue";
import BaseSelects from "../../../components/shared/BaseSelects";
import BaseButton from "../../../components/shared/BaseButton";
import team from "../../../data/team";
import BaseInput from "../../../components/shared/form/BaseInput";
import {useMyFetch} from "../../../composables/useMyFetch";
import ValidationWrapper from "../../../components/Wrappers/ValidationWrapper";
import LoadingWrapper from "../../../components/Wrappers/LoadingWrapper";
import {isObject} from "lodash";
import {useToast} from "vue-toastification";
import BaseTableOptions from "../../../components/shared/BaseTableOptions";
import assettoSeasons from "~/data/assettoSeasons";

const { myFetch } = useMyFetch();

definePageMeta({
  middleware: 'auth-assetto'
})

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
    title: 'Sezon',
    name: 'season'
  },
  {
    title: 'Opcje',
    name: 'options'
  }
]

const selectedSeason = ref();
const playerSplit = ref();
const loginForm = ref();
const playersRef = ref();
const toast = useToast();

const params = ref({
  season: '',
  team: '',
  active: true,
});

const model = ref({});

const playerDialog = ref(false);
const editMode = ref(false);
const loading = ref(false);

function selectSeason({value}) {
  params.value.season = value;
}

function openDialog(player = null) {
  player ? editMode.value = true : editMode.value = false;
   player ? model.value = {...player} : model.value = {};
   playerDialog.value = true;
}

async function send() {
  const { valid } = await loginForm.value.validate();
  if (valid) {
    try {
      loading.value = true;
      const res = await myFetch(model.value._id ? `/assetto-players/${model.value._id}` : '/assetto-players', {
        method: model.value._id ? 'PATCH' : 'POST',
        body: {
          ...model.value
        }
      });
      playersRef.value.refresh();
      playerDialog.value = false;
    } catch (e) {
      const errors = JSON.parse(e.message);
      if (errors && isObject(errors)) {
        loginForm.value.setErrors(errors);
      }
    } finally {
      loading.value = false;
    }
  }
}

async function deletePlayer({_id: id}) {
  try {
    loading.value = true;
    await myFetch(`/players/${id}`, {
      method: 'DELETE'
    });
    playersRef.value.refresh();
    playerDialog.value = false;
    toast.success('Zawodnik oznaczony jako nieaktywny');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.players {
  padding: $default-padding;
  grid-area: main;
}
</style>
