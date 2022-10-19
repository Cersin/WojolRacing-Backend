<template>
  <IconEdit v-if="buttons?.edit" class="icon icon--xl icon--primary" @click="emit('edit')"></IconEdit>
  <IconTrashAlt v-if="buttons?.delete" class="icon icon--xl icon--warning margin-left--sm" @click="emit('delete')"></IconTrashAlt>
</template>

<script setup>
import { IconEdit, IconTrashAlt } from "@iconify-prerendered/vue-fa-regular"

const props = defineProps({
  buttons: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['edit', 'delete']);
</script>

<style scoped>

</style>