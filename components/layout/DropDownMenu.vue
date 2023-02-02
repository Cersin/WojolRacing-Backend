<template>
  <div class="hidden-xs-only" style="display: flex; flex-direction: column;">
    <div style="display: flex;">

      <DropDownMenuItem title="Assetto Corsa" to="/assetto"/>

      <DropDownMenuItem title="Formuła 1" :dropdown="[
            {
            title: 'Wyniki',
            to: '/formula/wyniki',
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
        ]"/>

      <DropDownMenuItem title="Discord" link to="https://discord.com/invite/6MSNv53ekR"/>
    </div>


  </div>


</template>

<script>
import DropDownMenuItem from "~/components/layout/DropDownMenuItem.vue";
import Socials from "~/components/shared/Socials.vue";

export default {
  name: "DropDownMenu",
  components: {Socials, DropDownMenuItem}
}
</script>

<style scoped>

</style>