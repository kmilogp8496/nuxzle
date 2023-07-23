<script setup lang="ts">
import type { Field } from './interface'

defineOptions({
  name: 'Form',
})

defineProps<{ title?: string }>()

const emit = defineEmits<{
  (event: 'submit'): void
}>()

const fields = ref<Field[]>([])

async function validate() {
  const responses = await Promise.all(fields.value.map(field => field.validate()))
  return !responses.includes(false)
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
    <slot name="title">
      <h1 v-if="title" class="text-primary-500 text-xl">
        {{ title }}
      </h1>
    </slot>
    <slot />
  </form>
</template>
