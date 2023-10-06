<script setup lang="ts">
import type { Product } from '~/server/db/schemas/products/products.schema'

const props = defineProps<{
  item: Product
}>()

const { execute, error } = deleteProduct(props.item.id)
async function onSuccess() {
  await execute()
  if (error.value) {
    displayErrorFromApi(error)
    return false
  }
  return true
}
</script>

<template>
  <ConfirmDialog :on-success="onSuccess" content="¿Confirmas que deseas eliminar este producto?">
    <template #activator="{ on }">
      <UButton icon="i-heroicons-trash" color="red" v-bind="on" />
    </template>
  </ConfirmDialog>
</template>
