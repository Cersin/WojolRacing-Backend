<template>
  <div style="position: relative; display: flex;">
    <VField v-model="model" :label="label" :name="name" v-slot="{ field }" :rules="rules">
      <div class="form--wrapper">
        <label class="form--label">{{ label }}</label>
        <textarea :style="inputStyles" class="form--input" style="min-height: 200px" :type="type" v-bind="field" ></textarea>
        <VErrorMessage :name="name" v-slot="{ message }">
          <p class="form--error">{{ message }}</p>
        </VErrorMessage>
      </div>
    </VField>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  label: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  rules: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: [String, Array, Object, Boolean, Number],
    default: null
  },
  inputStyles: {
    type: String,
    default: '',
  }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

</script>

<style scoped>



</style>
