<template>
  <div class="socials">
    <IconFacebook @click="navigateToSocial('https://www.facebook.com/wojolracing')"/>
    <IconTwitch @click="navigateToSocial('https://www.twitch.tv/wojolracing')"/>
    <IconDiscord @click="navigateToSocial('https://discord.com/invite/6MSNv53ekR')"/>
    <IconTiktok @click="navigateToSocial('https://www.tiktok.com/@wojolracing')"/>
    <IconYoutube @click="navigateToSocial('https://www.youtube.com/channel/UC73euqkfm_O-S_jsCQk7Kxg')"/>
  </div>
</template>

<script setup>
import { IconDiscord } from "@iconify-prerendered/vue-fa6-brands"
import { IconFacebook } from "@iconify-prerendered/vue-fa6-brands"
import { IconYoutube } from "@iconify-prerendered/vue-fa6-brands"
import { IconTiktok } from "@iconify-prerendered/vue-fa6-brands"
import { IconTwitch } from "@iconify-prerendered/vue-fa6-brands"

function navigateToSocial(link) {
  window.open(link);
}
</script>

<style scoped lang="scss">
.socials {
  display: flex;
  gap: 1rem;
  font-size: 2rem;

svg {
  cursor: pointer;
}
}
</style>