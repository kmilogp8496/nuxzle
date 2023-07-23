<script setup lang="ts">
import { loginUser } from '~/api/auth.api'

const formData = ref({
  email: '',
  password: '',
})

useHead({
  title: 'Iniciar sesión',
})

const loading = ref(false)
const { error, execute } = loginUser(formData)

async function onSubmit() {
  loading.value = true
  await execute()
  loading.value = false
  if (error.value) {
    displayErrorNotification({
      description: error.value.statusMessage,
    })
  }
  else {
    displaySuccessNotification({
      description: 'Usuario logueado. Bienvenido!',
    })
    navigateTo({
      name: 'index',
    })
  }
}
</script>

<template>
  <Form title="Iniciar sesión" class="max-w-md mx-auto space-y-4" @submit="onSubmit">
    <FormInput v-model="formData.email" label="Email" :rules="[required, email]" />
    <FormInput v-model="formData.password" label="Contraseña" :rules="required" type="password" />
    <UButton :loading="loading" type="submit">
      Iniciar sesión
    </UButton>
  </Form>
</template>
