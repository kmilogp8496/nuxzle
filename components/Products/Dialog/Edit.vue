<script lang="ts" setup>
import { z } from 'zod'
import { productMarkets, productUnits } from '../Form.vue'
import type { Product } from '~/server/db/schemas/products/products.schema'

const props = defineProps<{
  item: Product
}>()

const emit = defineEmits<{
  (event: 'success'): void
}>()

const formData = ref<Product>(JSON.parse(JSON.stringify(props.item)))

const model = defineModel({
  default: false,
  local: true,
})

const schema = z.object({
  name: z.string({
    description: 'El nombre es obligatorio',
  }),
  // @ts-expect-error unknown error
  market: z.enum(productMarkets, {
    description: 'El mercado es obligatorio',
  }).optional(),
  price: z.number().min(0, 'El precio no puede ser negativo'),
  // @ts-expect-error unknown error
  unit: z.nativeEnum(productUnits, {
    description: 'La unidad es obligatoria',
  }),
  weight: z.number().min(0, 'El peso no puede ser negativo'),
})

const { error, execute } = editProduct(formData)

async function onSubmit() {
  await execute()
  if (error.value) {
    displayErrorFromApi(error)
    return
  }

  emit('success')
  model.value = false
}
</script>

<template>
  <FormDialog v-model="model" :schema="schema" :state="formData" title="Editar producto" @submit="onSubmit">
    <template #activator="{ on }">
      <UButton icon="i-heroicons-pencil" color="orange" v-bind="on" />
    </template>

    <ProductsForm v-model="formData" />

    <template #actions>
      <UButton
        label="Cancelar"
        variant="ghost"
        @click="model = false"
      />
      <UButton
        type="submit"
        icon="i-heroicons-pencil"
        label="Editar"
      />
    </template>
  </FormDialog>
</template>
