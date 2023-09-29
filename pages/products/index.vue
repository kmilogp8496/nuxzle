<script setup lang="ts">
import type { TableColumn } from '~/components/common.interface'
import type { Product } from '~/server/db/schemas/products/products.schema'

definePageMeta({
  middleware: 'auth',
})

const { limit, offset, page } = usePagination({ limit: 5 })

const { data, execute, refresh } = getProducts({ limit, offset })

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
] as TableColumn<Product>[]
</script>

<template>
  <ProductsCreateDialogVue @created="refresh" />
  <h1 class="text-2xl mt-10">
    Productos
  </h1>
  <Table
    v-model:limit="limit"
    v-model:page="page"
    :rows="data?.results ?? []"
    :columns="columns"
    :total="data?.total ?? 0"
  />
</template>
