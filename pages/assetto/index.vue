<template>
  <div class="layout">
    <MainHeader/>
    <div class="formula">
      <BaseHeader title="Klasyfikacja generalna"/>

      <div class="row hidden-lg">
        <BaseSelects
            class="col-12"
            label="Sezon"
            display-value
            :data="Object.keys(assettoSeasons)"
            v-model="params.season"
        />
      </div>

      <BaseTable
        ref="classification"
        :columns="raceColumn"
        podium
        :params="params"
        endpoint="assetto-race/playerPoints"
      >
        <template #POS="{rowIndex}">
          {{ +rowIndex + 1 }}
        </template>

      </BaseTable>

      <button class="button button--outline ripple margin-bottom"
              @click="saveImage('table', `klasyfikacja-split${params.split}-season${params.season}`)">
        Zapisz zdjęcie tabelki
      </button>
    </div>

      <div class="aside">
        <NavHeader aside/>
        <div class="row hidden-md">
          <BaseSelects
              class="col-12"
              label="Sezon"
              dark
              display-value
              :data="Object.keys(assettoSeasons)"
              v-model="params.season"
          />
        </div>
    </div>
  </div>

</template>

<script setup>
import BaseHeader from "../../components/shared/BaseHeader";
import BaseTable from "../../components/shared/BaseTable";
import {ref, computed} from "vue";
import MainHeader from "../../components/layout/MainHeader";
import split from "../../data/split";
import BaseSelects from "../../components/shared/BaseSelects";
import NavHeader from "../../components/layout/NavHeader";
import team from "../../data/team";
import useImage from "../../hooks/useImage";
import assettoSeasons from "~/data/assettoSeasons";

const {saveImage} = useImage();

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
    },
    {
      title: 'Points',
      name: 'points'
    }
]

const selectedSplit = ref(split["1"]);

const params = ref({
  season: assettoSeasons["GT300 Cup"].value,
});

const classification = ref();

const response = computed(() => {
  return classification?.value?.data;
})

function selectSplit({value}) {
  params.value.split = value;
}
</script>

<style scoped lang="scss">
.formula {
  padding: $default-padding;
  background-color: black;
  grid-area: main;

  h1 {
    font-size: 6rem;
  }
}
</style>
