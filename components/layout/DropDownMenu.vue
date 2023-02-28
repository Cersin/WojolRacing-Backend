<template>
  <div class="hidden-xs-only" style="display: flex; flex-direction: column;">
    <div style="display: flex;">

      <DropDownMenuItem title="Formuła 1" :dropdown="[
          {
            title: 'Wyniki',
            to: '/formula/wyniki',
          },
          {
            title: 'Wyniki zbiorcze',
            to: '/formula/wyniki-zbiorcze',
          },
          {
            title: 'Klasyfikacja generalna',
            to: '/formula',
          },
           {
            title: 'Klasyfikacja zespołowa',
            to: '/formula/teams',
          },
          {
            title: 'Statystyki',
            to: '/formula/statystyki',
          }
        ]"/>

      <DropDownMenuItem title="Assetto" :dropdown="[
          {
            title: 'Wyniki',
            to: '/assetto/wyniki',
          },
          {
            title: 'Wyniki zbiorcze',
            to: '/assetto/wyniki-zbiorcze',
          },
          {
            title: 'Klasyfikacja generalna',
            to: '/assetto',
          },
          {
            title: 'Statystyki',
            to: '/assetto/statystyki',
          }
        ]"/>

      <DropDownMenuItem title="Powtórki" :dropdown="[
          {
            title: 'Sezon 1 F1',
            to: 'https://www.youtube.com/playlist?list=PLNmZj_25aJk1z2jCMUMkFw5IXh-cNruUi',
            link: true
          },
           {
            title: 'Sezon 1 F2',
            to: 'https://www.youtube.com/playlist?list=PLNmZj_25aJk3aDoBEds_pXhoOv2is2-e-',
            link: true
          },
          {
            title: 'Sezon 2 F1',
            to: 'https://www.youtube.com/playlist?list=PLNmZj_25aJk3r7cpbhUiOD5R6obpDaZ2_',
            link: true
          },
          {
            title: 'Sezon 2 F2',
            to: 'https://www.youtube.com/playlist?list=PLNmZj_25aJk0be_A_Uo3m2pi51dvyal86',
            link: true
          },
        ]"/>

      <DropDownMenuItem title="Discord" link to="https://discord.com/invite/6MSNv53ekR"/>

      <DropDownMenuItem v-if="authState.logged && authState.role === 'admin'" title="Admin" :dropdown="[
          {
            title: 'Admin Wyścigi',
            to: '/admin/races'
          },
           {
            title: 'Admin Zawodnicy',
            to: '/admin/players'
          },
        ]"/>

      <DropDownMenuItem v-if="authState.logged && authState.role === 'admin-assetto'" title="Admin Assetto" :dropdown="[
          {
            title: 'Admin Wyścigi',
            to: '/admin/assetto/races'
          },
           {
            title: 'Admin Zawodnicy',
            to: '/admin/assetto/players'
          },
        ]"/>

    </div>


  </div>


</template>

<script setup>
import DropDownMenuItem from "~/components/layout/DropDownMenuItem.vue";
import Socials from "~/components/shared/Socials.vue";
import {useAuthComposable} from "~/composables/auth-composable";

const {authState} = useAuthComposable();

</script>

<style scoped>

</style>