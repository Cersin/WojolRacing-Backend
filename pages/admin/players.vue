<template>
  <div class="layout">
    <MainHeader/>

    <div class="players">

    <BaseTable
      ref="playersRef"
      :columns="playerColumns"
      endpoint="players"
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
              :value="model.split"
              label="Split"
              name="split"
            >
              <BaseSelects
                v-model="playerSplit"
                label="Split"
                form
                dark
                display-value
                display-label="label"
                additionalLabel="Split "
                :data="split"
                @update:model-value="model.split = $event.value"
              />
            </ValidationWrapper>


            <ValidationWrapper
              class="col-6 md-col-12"
              :value="model.team"
              label="Zespół"
              name="team"
            >
              <BaseSelects
                v-model="model.team"
                label="Zespół"
                form
                dark
                display-value
                :data="teamOptions"
              />
            </ValidationWrapper>
          </div>

          <BaseButton @click="send()" class="col-3 md-col-6 margin-top" style="align-self: center" secondary>Wyślij</BaseButton>
        </VForm>
      </LoadingWrapper>
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
import ValidationWrapper from "../../components/Wrappers/ValidationWrapper";
import LoadingWrapper from "../../components/Wrappers/LoadingWrapper";
import {isObject} from "lodash";
import {useToast} from "vue-toastification";
import BaseTableOptions from "../../components/shared/BaseTableOptions";

const { myFetch } = useMyFetch();

definePageMeta({
  middleware: 'auth'
})

const teamOptions = ['Rezerwa', ...team];

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
const playersRef = ref();
const toast = useToast();

const params = ref({
  split: '',
  team: '',
  active: true
});

const model = ref({});

const playerDialog = ref(false);
const editMode = ref(false);
const loading = ref(false);

function selectSplit({value}) {
  params.value.split = value;
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
      const res = await myFetch(model.value._id ? `/players/${model.value._id}` : '/players', {
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