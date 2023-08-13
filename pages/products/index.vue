<script setup lang="ts">
import type { TableColumn } from 'components/common.interface'
import type { Product } from 'server/db/schemas/products.schema'

definePageMeta({
  middleware: 'auth',
})

const { limit, offset } = usePagination()

const { data, execute } = getProducts({
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
</script>

<template>
  <ProductsCreateDialogVue />
  <h1 class="text-2xl mt-10">
    Productos
  </h1>
  <UTable :rows="data ?? []" :columns="columns" />
</template>
