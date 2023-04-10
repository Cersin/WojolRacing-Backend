<template>
  <ul class="information_list" style="list-style-type:circle">
    <h2>{{ title }}</h2>
    <li v-for="(item, index) in list" :key="index">
      {{ item }}
    </li>
  </ul>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  }
})

</script>

<style scoped lang="scss">
.information_list {
  flex: 1;
  flex-direction: column;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  width: 400px;
  align-items: center;
  text-align: left;

  h2 {
    color: $color-primary;
  }
}

</style>
