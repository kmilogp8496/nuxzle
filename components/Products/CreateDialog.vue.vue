<script lang="ts" setup>
import type { UnwrapRef } from 'vue'

const emit = defineEmits<{
  (event: 'created'): void
}>()

const defaultData = {
  name: '',
  market: '',
}

const formData = ref(defaultData)

const model = defineModel({
  default: false,
  local: true,
})

const { error, execute } = createProduct(formData)

const productMarkets = ['Carrefour', 'Mercadona', 'Lidl', 'Casa Elías', 'Alcampo', 'Dia'] as const

async function onSubmit() {
  await execute()
  if (error.value) {
    displayErrorFromApi(error)
    return
  }

  emit('created')
  model.value = false
}
</script>

<template>
  <FormDialog v-model="model" title="Crear producto" @submit="onSubmit">
    <template #activator="{ on }">
      <UButton v-bind="on">
        Crear producto
      </UButton>
    </template>

    <FormInput
      v-model="formData.name"
      label="Nombre"
      placeholder="Nombre"
      :rules="required"
    />

    <template #actions>
      <UButton
        type="submit"
        label="Buscar"
      />
    </template>
  </FormDialog>
</template>
