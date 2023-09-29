<script lang="ts" setup>
const emit = defineEmits<{
  (event: 'created'): void
}>()

const defaultData = {
  name: '',
  market: 'Carrefour',
} as const

const formData = ref(defaultData)

const model = defineModel({
  default: false,
  local: true,
})

const { error, execute } = createProduct(formData)

const productMarkets = ['Carrefour', 'Mercadona', 'Lidl', 'Casa Elías', 'Alcampo', 'Dia'] as const

async function onSubmit() {
  await execute()
  if (error.value) {
    displayErrorFromApi(error)
    return
  }

  emit('created')
  model.value = false
}
</script>

<template>
  <FormDialog v-model="model" title="Crear producto" @submit="onSubmit">
    <template #activator="{ on }">
      <UButton icon="i-heroicons-plus" color="green" v-bind="{ ...on, class: $attrs?.class ?? '' }">
        Crear producto
      </UButton>
    </template>

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

    <template #actions>
      <UButton
        label="Cancelar"
      />
      <UButton
        type="submit"
        label="Crear"
      />
    </template>
  </FormDialog>
</template>
