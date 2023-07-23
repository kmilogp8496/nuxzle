<script setup lang="ts">
import { registerUser } from '~/api/auth.api'

const data = ref({
  email: 'asdasd',
  password: '',
})

function onSubmit() {
  const response = registerUser(data.value)
}
</script>

<template>
  <UContainer class="space-y-4">
    <h1 class="text-primary text-xl">
      Registrarse
    </h1>
    <Form class="max-w-md" @submit="onSubmit">
      <FormInput v-model="data.email" label="Email" :rules="[required, email]" />
      <FormInput v-model="data.password" label="password" :rules="required" type="password" />
      <UButton type="submit" class="mt-4">
        Registrarse
      </UButton>
    </Form>
  </UContainer>
</template>
