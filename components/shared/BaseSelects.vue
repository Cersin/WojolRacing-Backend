<template>
  <button ref="selector" class="selector" @click.self="toggleVisibility()"
          :class="{ 'selector--dark': dark}">
      {{ label }}
    <img @click.self="toggleVisibility()" class="arrow" src="/ui/arrow-right.svg" alt="arrow" width="25px" height="25px">
      <div class="arrow_wrapper"><i class="arrow arrow--down"></i></div>

    <div v-if="visible" class="selector__options">
      <div v-for="(el, index) in data" :key="index"
          @click="selected(el)" class="selector__options-value">
        {{ el }}
      </div>
    </div>
  </button>
</template>

<script setup>
import {ref} from "vue";
import { onClickOutside } from '@vueuse/core'

const selector = ref(null);

defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: "Wybierz"
  },
  data: {
    type: Array,
    default: null
  },
  key: {
    type: String,
    default: ""
  }
})

const emit = defineEmits(['selected'])

const visible = ref(false);

onClickOutside(selector, (event) => {
  toggleVisibility(false);
})

function toggleVisibility(state) {
  if (state !== undefined) return visible.value = state;
  visible.value = !visible.value;
}

function selected(data) {
  emit('selected', data);
  toggleVisibility(false);
}
</script>

<style scoped lang="scss">
.selector {
  display: flex;
  align-items: center;
  border-radius: 10px;
  position: relative;
  background-color: $color-primary;
  color: black;
  border: none;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25));
  padding: 1rem 1.2rem;

  &:hover {
    cursor: pointer;
  }

  &:hover > &__options {
    opacity: 95;
  }

  &--dark {
    background-color: black !important;
    color: $color-primary !important;
  }

  &__options {
    position: absolute;
    width: 100%;
    top: 90%;
    left: 0;
    right: 0;
    background-color: $color-grey-dark;
    color: white;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 999;
    transition: all .5s;

    &-value {
      padding: .7rem;
      cursor: pointer;

      &:hover {
        background-color: lighten($color-grey-dark, 15%);
      }
    }
  }
}


.arrow {
}

</style>
