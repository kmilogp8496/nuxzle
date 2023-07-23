<script setup lang="ts">
import type { FormGroupProps, InjectedForm } from './interface'

const props = defineProps<FormGroupProps>()
const dirty = ref(false)
const canValidate = ref(false)

const computedError = computed<string>(() => {
  if (props.error)
    return props.error

  if (!dirty.value || !canValidate.value || props.modelValue === undefined || !props.rules)
    return ''

  const value = String(props.modelValue)

  const defaultErrorMessage = `El campo ${props.label} es inválido`

  if (Array.isArray(props.rules)) {
    for (const rule of props.rules) {
      const result = rule(value, props.label)
      if (result !== true)
        return result || defaultErrorMessage
    }
  }
  else {
    const result = props.rules(value, props.label)
    if (result !== true)
      return result || defaultErrorMessage
  }
  return ''
})

function onUpdateModelValue() {
  if (!props.lazy)
    canValidate.value = true
}

function onBlur() {
  if (props.lazy)
    canValidate.value = false
}

function onKeyDown(event: KeyboardEvent) {
  if (!event.key || event.key === 'Tab')
    return

  dirty.value = true
}

function validate() {
  canValidate.value = true
  dirty.value = true

  return computedError.value === ''
}

const form = inject<InjectedForm>('form')

const field = {
  validate,
}

onMounted(() => {
  form?.registerField(field)
})

onBeforeUnmount(() => {
  form?.removeField(field)
})
</script>

<template>
  <UFormGroup v-bind="{ label, help, description, error: computedError }">
    <slot
      :on="{
        'keydown': onKeyDown,
        'update:modelValue': onUpdateModelValue,
        'blur': onBlur,
      }"
    />
  </UFormGroup>
</template>
