<script setup lang="ts">
import type { TableColumn } from 'components/common.interface'
import type { Product } from 'server/utils/db/schemas/products.schema'

definePageMeta({
  middleware: 'auth',
})

const columns = [
  {
    key: 'name',
    label: 'Nombre',
  },
] as TableColumn<Product>[]
</script>

<template>
  <UTable :rows="[]" :columns="columns" />
</template>
