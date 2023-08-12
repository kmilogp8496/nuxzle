<script setup lang="ts">
useHead({
  title: 'Registrarse',
})

const formData = ref({
  email: '',
  password: '',
})

const toast = useToast()
const loading = ref(false)
const { error, execute } = registerUser(formData)

const route = useRoute()
const authStore = useAuthStore()

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
      title: 'Éxito',
      description: 'Usuario registrado',
      color: 'green',
    })

    await loginUser(formData)

    await authStore.getUserData()

    if (route.query.redirect && typeof route.query.redirect === 'string')
      return navigateTo(route.query.redirect)

    navigateTo({
      name: 'index',
    })
  }
}
</script>

<template>
  <Form title="Registrarse" class="max-w-md space-y-4 mx-auto" @submit="onSubmit">
    <FormInput v-model="formData.email" label="Email" :rules="[required, email]" />
    <FormInput v-model="formData.password" label="Contraseña" :rules="required" type="password" />
    <UButton :loading="loading" type="submit">
      Registrarse
    </UButton>
  </Form>
</template>
