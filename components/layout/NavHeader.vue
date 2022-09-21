<template>
  <div class="header">
      <div class="socials">
        <IconFacebook @click="navigateToSocial('https://www.facebook.com/wojolracing')"/>
        <IconTwitch @click="navigateToSocial('https://www.twitch.tv/wojolracing')"/>
        <IconDiscord @click="navigateToSocial('https://discord.com/invite/6MSNv53ekR')"/>
        <IconTiktok @click="navigateToSocial('https://www.tiktok.com/@wojolracing')"/>
        <IconYoutube @click="navigateToSocial('https://www.youtube.com/channel/UC73euqkfm_O-S_jsCQk7Kxg')"/>
      </div>

      <BaseMenu :aside="aside" :active="active"/>
  </div>
</template>

<script setup>
import {navigateTo} from "nuxt/app";
import BaseMenu from "../shared/BaseMenu";
import {ref} from "vue";
import { IconDiscord } from "@iconify-prerendered/vue-fa6-brands"
import { IconTwitch } from "@iconify-prerendered/vue-fa6-brands"
import { IconFacebook } from "@iconify-prerendered/vue-fa6-brands"
import { IconYoutube } from "@iconify-prerendered/vue-fa6-brands"
import { IconTiktok } from "@iconify-prerendered/vue-fa6-brands"

defineProps({
  aside: {
    type: Boolean,
    default: false
  }
})

const active = ref(false);

function navigateToSocial(link) {
  window.open(link);
}
</script>

<style scoped lang="scss">
.header {
  padding: $default-padding;
  display: flex;
  gap: 2rem;
  height: 80px;
  justify-content: space-between;
  align-items: center;
}

.socials {
  display: flex;
  gap: 1rem;
  font-size: 2rem;

  svg {
    cursor: pointer;
  }
}

</style>
