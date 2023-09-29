<script setup lang="ts">
import type { FormSelectProps } from './interface'

defineProps<FormSelectProps>()

const modelValue = defineModel({
  default: '',
})
</script>

<template>
  <FormGroup v-bind="{ label, help, description, error, lazy, rules, modelValue }">
    <template #default="{ on }">
      <USelect
        v-model="modelValue"
        v-bind="{ placeholder, trailingIcon, type, on, options, optionAttribute, valueAttribute }"
        v-on="on"
      />
    </template>
  </FormGroup>
</template>
