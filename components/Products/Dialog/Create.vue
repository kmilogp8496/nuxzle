<script lang="ts" setup>
import type { InsertProduct } from '~/server/db/schemas/products/products.schema'

const emit = defineEmits<{
  (event: 'created'): void
}>()

const defaultData = {
  name: '',
  market: useAuthStore().user?.default_market ?? 'Carrefour',
  price: 0,
  unit: 'g',
  weight: 0,
} satisfies Omit<InsertProduct, 'created_by'>

const formData = ref(structuredClone(defaultData))

const model = defineModel({
  default: false,
  local: true,
})

const { error, execute, status } = createProduct(formData)

async function onSubmit() {
  await execute()
  if (error.value) {
    displayErrorFromApi(error)
    return
  }

  emit('created')
  model.value = false
}

watch(
  () => model.value,
  (value) => {
    if (value)
      formData.value = JSON.parse(JSON.stringify(defaultData))
  },
)
</script>

<template>
  <FormDialog v-model="model" title="Crear producto" @submit="onSubmit">
    <template #activator="{ on }">
      <UButton icon="i-heroicons-plus" color="green" v-bind="{ ...on, class: $attrs?.class ?? '' }">
        Crear producto
      </UButton>
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
        label="Crear"
        icon="i-heroicons-plus"
        :loading="status === 'pending'"
      />
    </template>
  </FormDialog>
</template>
