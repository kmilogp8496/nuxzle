<script setup lang="ts">
import type { Field } from './interface'

const emit = defineEmits<{
  (event: 'submit'): void
}>()

const fields = ref<Field[]>([])

async function validate() {
  for (const field of fields.value) {
    const isValid = await field.validate()
    if (!isValid)
      return false
  }
}

function registerField(field: Field) {
  fields.value.push(field)
}

function removeField(field: Field) {
  const index = fields.value.indexOf(field)
  if (index > -1)
    fields.value.splice(index, 1)
}

async function handleSubmit() {
  const isValid = await validate()
  if (isValid)
    emit('submit')
}

provide('form', {
  registerField,
  removeField,
})
</script>

<template>
  <form @submit.prevent.stop="handleSubmit">
    <slot />
  </form>
</template>
