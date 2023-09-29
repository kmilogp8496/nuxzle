<script setup lang="ts">
import type { UnwrapRef } from 'nuxt/dist/app/compat/capi'
import type { CreateProduct } from '~/api/products.api'
import type { Product } from '~/server/db/schemas/products/products.schema'

const formData = defineModel<UnwrapRef<CreateProduct> | Product>({
  default: {
    name: '',
    market: 'Carrefour',
    price: 0,
  },
  local: true,
})

const productMarkets = ['Carrefour', 'Mercadona', 'Lidl', 'Casa Elías', 'Alcampo', 'Dia'] as const
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
