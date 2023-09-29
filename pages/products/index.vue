<script setup lang="ts">
import type { TableColumn } from '~/components/common.interface'
import type { Product } from '~/server/db/schemas/products/products.schema'

definePageMeta({
  middleware: 'auth',
})

const { limit, offset, page } = usePagination({ limit: 5 })

const { data, execute, refresh } = getProducts({ limit, offset })
const { $format } = useNuxtApp()

execute()
const columns = [
  {
    key: 'name',
    label: 'Nombre',
  },
  {
    key: 'created_at',
    label: 'Fecha de creación',
  },
  {
    key: 'market',
    label: 'Mercado',
  },
  {
    key: 'price',
    label: 'Precio (€)',
    transform: value => $format.asCents(value.price),
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
  >
    <template #header>
      <h1 class="text-2xl">
        Productos
      </h1>

      <ProductsCreateDialog class="ml-auto" @created="refresh" />
    </template>
    <template #actions-data="{ row }">
      <UButtonGroup>
        <ProductsEditDialog :item="row" @success="refresh" />
        <ProductsDeleteButton />
      </UButtonGroup>
    </template>
  </Table>
</template>
