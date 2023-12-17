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
</script>

<script lang="ts">
export const productUnits: ProductUnit[] = ['g', 'kg', 'L', 'mL'] as const
export const productMarkets: ProductMarket[] = ['Carrefour', 'Mercadona', 'Lidl', 'Alcampo', 'Dia', 'Casa Elías'] as const
</script>

<template>
  <UFormGroup label="Nombre" name="name">
    <UInput
      v-model="formData.name"
      placeholder="Nombre"
    />
  </UFormGroup>

  <UFormGroup label="Mercado" name="market">
    <USelect
      v-model="formData.market"
      placeholder="Mercado"
      :options="productMarkets"
    />
  </UFormGroup>

  <div class="flex items-center gap-4">
    <UFormGroup class="w-full" :label="`Peso (${formData.unit})`" name="weight">
      <UInput
        v-model.number="formData.weight"
        type="number"
        :placeholder="`Peso (${formData.unit})`"
      />
    </UFormGroup>

    <UFormGroup label="Unidad" name="unit">
      <USelect
        v-model="formData.unit"
        class="w-full"
        placeholder="Unidad"
        :options="productUnits"
      />
    </UFormGroup>
  </div>

  <UFormGroup label="Precio" name="price">
    <UInput
      v-model.number="formData.price"
      type="number"
      step="0.01"
      :help="$format.asCurrency(formData.price ?? 0)"
      placeholder="Precio (€)"
      trailing-icon="i-heroicons-currency-euro"
    />
  </UFormGroup>
</template>
