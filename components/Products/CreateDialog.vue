<script lang="ts" setup>
const emit = defineEmits<{
  (event: 'created'): void
}>()

const defaultData = {
  name: '',
  market: 'Carrefour',
  price: 0,
} as const

const formData = ref(defaultData)

const model = defineModel({
  default: false,
  local: true,
})

const { error, execute } = createProduct(formData)

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

    <ProductsForm v-model="formData" />

    <template #actions>
      <UButton
        label="Cancelar"
        variant="ghost"
        @click="model = false"
      />
      <UButton
        type="submit"
        label="Crear"
        icon="i-heroicons-plus"
      />
    </template>
  </FormDialog>
</template>
