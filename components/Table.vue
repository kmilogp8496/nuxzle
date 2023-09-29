<script lang="ts" setup generic="T extends Record<string, unknown>">
import type { TableColumn } from './common.interface'

const props = defineProps<{
  rows: T[]
  columns: TableColumn<T>[]
  total: number
}>()

const page = defineModel('page', {
  default: 1,
  local: true,
})

const limit = defineModel('limit', {
  default: 5,
  local: true,
})

const transformableColumns = computed(() => props.columns.filter(column => !!column.transform))
</script>

<template>
  <UTable :rows="rows" :columns="columns" :ui="{ wrapper: 'border rounded border-gray-300 dark:border-gray-700' }">
    <template v-for="column in transformableColumns" :key="`transformed-${column.key}`" #[`${column.key}-data`]="{ row }">
      {{ column.transform!(row) }}
    </template>

    <template v-for="(_, name) in $slots" :key="`slot-${name}`" #[name]="{ row }">
      <slot :name="name" :row="row" />
    </template>
  </UTable>
  <div class="flex justify-end items-center gap-4 mt-4">
    <span> Total: {{ total }} </span> <UPagination v-model="page" :page-count="limit" :total="total" />
  </div>
</template>

<style>

</style>
