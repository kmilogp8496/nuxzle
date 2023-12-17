<script setup lang="ts">
import type { FormItemProps } from './interface'

defineProps<FormItemProps>()

const modelValue = defineModel({
  default: '',
})
</script>

<template>
  <FormGroup v-bind="{ label, help, description, error, lazy, rules, modelValue }">
    <template #default="{ on }">
      <UInput
        v-model="modelValue"
        v-bind="{ placeholder, trailingIcon, type, on, step }"
        v-on="on"
      />
    </template>
  </FormGroup>
</template>
