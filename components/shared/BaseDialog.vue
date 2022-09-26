<template>
  <transition>
  <div v-if="dialogOpen" class="dialog">
    <div class="dialog__box">
      <div class="dialog__box--header">
        <slot name="header"/>
        <IconClose class="button--icon" @click="dialogOpen = false"></IconClose>
      </div>
      ee
    </div>
  </div>
  </transition>
</template>

<script setup>
import {computed} from "vue";
import { IconClose } from "@iconify-prerendered/vue-mdi"

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:open']);

const dialogOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
});


</script>

<style scoped lang="scss">
.dialog {
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  color: black;

  &__box {
    background-color: $color-primary;
    border-radius: 10px;
    min-height: 200px;
    margin: 15% auto;
    padding: 20px;
    width: 80%;

    &--header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 2.8rem;
      font-weight: bold;
    }
  }
}

</style>