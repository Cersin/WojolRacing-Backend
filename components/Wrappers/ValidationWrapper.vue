<template>
  <div>
    <VField
      v-model="model"
      :name="name"
      :label="label"
      :rules="rules"
      :validate-on-input="true"
    >
      <slot>eee</slot>
      <div>
        <VErrorMessage
          :label="label"
          v-slot="{ message }"
          :name="name"
        >
          <p>{{ message }}</p>
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
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rules: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Array, Object, Number, Boolean],
    default: null
  }
})

const model = computed(() => {
  return props.value
});

</script>

<style scoped>

</style>