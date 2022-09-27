<template>
  <div style="position: relative; display: flex;">
    <button ref="selector" class="selector" @click.self="toggleVisibility()"
            :class="{ 'selector--dark': dark}">
        {{ model && displayValue ? (displayLabel ? `${additionalLabel} ${model[displayLabel]}` : `${additionalLabel}${model}`) : label }}
      <IconArrowDownCircle class="arrow"/>
    </button>

    <div v-if="visible" class="selector__options">
      <div v-for="(el, index) in data" :key="index"
           @click="selected(el, index)" class="selector__options-value">
        {{ displayLabel ? el[displayLabel] : el }}
      </div>

      <div v-if="!data || data?.length === 0" class="selector__options-value">
        Brak danych
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref, computed} from "vue";
import { onClickOutside } from '@vueuse/core'
import { IconArrowDownCircle } from "@iconify-prerendered/vue-mdi"

const selector = ref(null);

const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: "Wybierz"
  },
  displayValue: {
    type: Boolean,
    default: false
  },
  displayLabel: {
    type: String,
    default: ""
  },
  selectValue: {
    type: String,
    default: ""
  },
  additionalLabel: {
    type: String,
    default: ""
  },
  data: {
    type: [Array, Object],
    default: null
  },
  key: {
    type: String,
    default: ""
  },
  modelValue: {
    type: [String, Number, Object, Array],
    default: null
  }
})

const emit = defineEmits(['selected', 'update:modelValue'])

const visible = ref(false);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', props.selectValue ? value[props.selectValue] : value)
});

onClickOutside(selector, (event) => {
  toggleVisibility(false);
})

function toggleVisibility(state) {
  if (state !== undefined) return visible.value = state;
  visible.value = !visible.value;
}

function selected(data, index) {
  model.value = data;
  emit('selected', {
    data: data,
    index: index
  });
  toggleVisibility(false);
}
</script>

<style scoped lang="scss">
.selector {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  background-color: $color-primary;
  color: black;
  border: none;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25));
  padding: 1rem 0rem 1rem 1.2rem;
  z-index: 50;
  width: 100%;

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
    background-color: $color-grey-dark;
    color: white;
    top: 95%;
    font-size: 1.2rem;
    text-align: center;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 60;
    transition: all .5s;

    &-value {
      padding: .7rem;
      cursor: pointer;
      z-index: 60;

      &:hover {
        background-color: lighten($color-grey-dark, 15%);
        z-index: 60;

      }
    }
  }
}


.arrow {
  margin-left: .5rem;
  font-size: 1.5rem;
}

</style>
