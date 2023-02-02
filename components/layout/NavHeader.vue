<template>
  <div class="header" :class="{'hidden-md': aside}">
    <Socials></Socials>

    <div class="hidden-lg">
      <BaseMenu :aside="aside" :active="active"/>
    </div>
  </div>
</template>

<script setup>
import BaseMenu from "../shared/BaseMenu";
import {ref} from "vue";
import Socials from "~/components/shared/Socials.vue";


defineProps({
  aside: {
    type: Boolean,
    default: false
  }
})

const active = ref(false);


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



</style>
