<script setup lang="ts">
import type { TableColumn } from '~/components/common.interface'
import type { Product } from '~/server/db/schemas/products/products.schema'

definePageMeta({
  middleware: 'auth',
})

useHead({
  title: 'Productos',
})

const { limit, offset, page } = usePagination({ limit: 5 })

const { data, refresh, status } = getProducts({ limit, offset })
const { $format } = useNuxtApp()
const columns = [
  {
    key: 'name',
    label: 'Nombre',
    transform: value => `${value.name} (${value.market})`,
  },
  {
    key: 'price',
    label: 'Precio (€)',
    transform: value => $format.asCents(value.price),
  },
  {
    key: 'weight',
    label: 'Peso',
    transform: value => `${value.weight} ${value.unit}`,
  },
  {
    key: 'created_at',
    label: 'Fecha de creación',
  },
  {
    key: 'actions',
    label: 'Acciones',
  },
] as TableColumn<Product>[]
</script>

<template>
  <Table
    v-model:limit="limit"
    v-model:page="page"
    :rows="data?.results ?? []"
    :columns="columns"
    :total="data?.total ?? 0"
    :loading="status === 'pending'"
  >
    <template #header>
      <h1 class="text-2xl">
        Productos
      </h1>

      <ProductsDialogCreate class="ml-auto" @created="refresh" />
    </template>
    <template #actions-data="{ row }">
      <UButtonGroup>
        <ProductsDialogEdit :item="row" @success="refresh" />
        <ProductsDialogDelete :item="row" @success="refresh" />
      </UButtonGroup>
    </template>
  </Table>
</template>
