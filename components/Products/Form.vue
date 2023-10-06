<script setup lang="ts">
import type { UnwrapRef } from 'nuxt/dist/app/compat/capi'
import type { CreateProduct } from '~/api/products.api'
import type { InsertProduct, Product, ProductMarket, ProductUnit, UpdateProduct } from '~/server/db/schemas/products/products.schema'

const formData = defineModel<UnwrapRef<CreateProduct> | Product>({
  default: {
    name: '',
    market: 'Carrefour',
    price: 0,
    weight: 0,
    unit: 'g',
  } satisfies Omit<InsertProduct, 'created_by'> & UpdateProduct,
  local: true,
})

const productMarkets: readonly ProductMarket[] = ['Carrefour', 'Mercadona', 'Lidl', 'Alcampo', 'Dia', 'Casa Elías'] as const
const productUnits: readonly ProductUnit[] = ['g', 'kg', 'L', 'mL'] as const
</script>

<template>
  <FormInput
    v-model="formData.name"
    label="Nombre"
    placeholder="Nombre"
    :rules="required"
  />

  <FormSelect
    v-model="formData.market"
    label="Mercado"
    placeholder="Mercado"
    :rules="required"
    :options="productMarkets"
  />

  <div class="flex items-center gap-4">
    <FormInput
      v-model.number="formData.weight"
      type="number"
      :label="`Peso (${formData.unit})`"
      :placeholder="`Peso (${formData.unit})`"
      :rules="required"
      class="w-full"
    />

    <FormSelect
      v-model="formData.unit"
      class="w-full"
      label="Unidad"
      placeholder="Unidad"
      :rules="required"
      :options="productUnits"
    />
  </div>

  <FormInput
    v-model.number="formData.price"
    type="number"
    label="Precio"
    :help="$format.asCents(formData.price ?? 0)"
    placeholder="Precio (€)"
    :rules="required"
    trailing-icon="i-heroicons-currency-euro"
  />
</template>
