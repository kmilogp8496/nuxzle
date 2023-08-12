<script setup lang="ts">
import { loginUser } from '~/api/auth.api'

definePageMeta({
  middleware: [
    function () {
      const nuxtApp = useNuxtApp()
      const authStore = useAuthStore(nuxtApp.$pinia)
      if (!authStore.isLogged)
        return

      const redirect = nuxtApp.$router.currentRoute.value.query.redirect
      if (redirect && typeof redirect === 'string')
        return navigateTo(redirect)

      return navigateTo({
        name: 'index',
      })
    },
  ],
})

const formData = ref({
  email: '',
  password: '',
})

useHead({
  title: 'Iniciar sesión',
})

const loading = ref(false)
const { error, execute } = loginUser(formData)
const route = useRoute()

async function onSubmit() {
  loading.value = true
  await execute()
  loading.value = false
  if (error.value) {
    displayErrorNotification({
      description: error.value.data.message,
    })
  }
  else {
    displaySuccessNotification({
      title: 'Inicio de sesión exitoso',
      description: `Bienvenido! ${formData.value.email}`,
    })

    await useAuthStore().getUserData()

    const redirect = route.query.redirect

    if (redirect && typeof redirect === 'string')
      navigateTo(redirect)

    else
      navigateTo({ name: 'index' })
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
