<template>
  <div v-if="dropdown.length" class="dropdown">
    {{ title }}

    <div class="dropdown__menu">
      <div v-for="(el, index) in dropdown" :key="index" class="dropdown__menu--link" >
        <a v-if="el.link" @click="navigateToSocial(el.to)">
          {{ el.title }}
        </a>
        <NuxtLink v-else :to="el.to">
          {{ el.title }}
        </NuxtLink>
      </div>

    </div>
  </div>

  <a v-if="link && !dropdown.length" class="dropdown" @click="navigateToSocial(to)">{{ title }}</a>

  <NuxtLink v-if="!link && !dropdown.length" class="dropdown" :to="to">
    {{ title }}
  </NuxtLink>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  to: {
    type: String,
    default: ""
  },
  dropdown: {
    type: Array,
    default: () => []
  },
  link: {
    type: Boolean,
    default: false
  }
})

function navigateToSocial(link) {
  window.open(link);
}
</script>

<style scoped>

</style>