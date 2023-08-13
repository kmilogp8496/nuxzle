<script setup lang="ts">
import type { TableColumn } from 'components/common.interface'
import type { Product } from 'server/utils/db/schemas/products.schema'

definePageMeta({
  middleware: 'auth',
})

const { limit, offset } = usePagination()

const { data, refresh, execute } = getProducts({
  limit: limit.value,
  offset: offset.value,
})

execute()
const columns = [
  {
    key: 'name',
    label: 'Nombre',
  },
] as TableColumn<Product>[]

const formData = ref({
  name: '',
})

async function onSubmit() {
  const { error } = await createProduct(formData)
  if (error)
    displayErrorFromApi(error)
}
</script>

<template>
  <UCard class="max-w-lg mb-10">
    <Form title="Crear producto" class="space-y-8" @submit="onSubmit">
      <FormInput
        v-model="formData.name"
        label="Nombre"
        placeholder="Nombre"
        :rules="required"
      />
      <UButton
        type="submit"
        label="Buscar"
        @click="refresh"
      />
    </Form>
  </UCard>

  <h1 class="text-2xl">
    Productos
  </h1>
  <UTable :rows="data ?? []" :columns="columns" />
</template>
