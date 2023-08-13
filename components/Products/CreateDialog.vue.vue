<script lang="ts" setup>
const formData = ref({
  name: '',
})

async function onSubmit() {
  const { error } = await createProduct(formData)
  if (error)
    displayErrorFromApi(error)
}
</script>

<template>
  <Dialog>
    <template #activator="{ on }">
      <UButton v-on="on">
        Crear producto
      </UButton>
    </template>
    <Form title="Crear producto" class="space-y-8" @submit="onSubmit">
      <FormInput
        v-model="formData.name"
        label="Nombre"
        placeholder="Nombre"
        :rules="required"
      />
      <UButton
        type="submit"
        label="Buscar"
      />
    </Form>
  </Dialog>
</template>
