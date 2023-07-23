<script setup lang="ts">
useHead({
  titleTemplate: '%s - My App',
})

const title = computed(() => useNuxtApp().$layout.title.value)
</script>

<template>
  <div>
    <UContainer class="py-4 flex items-center justify-end gap-4">
      <UButton icon="i-heroicons-user" :to="{ name: 'auth-login' }">
        Iniciar sesión
      </UButton>
      <UButton icon="i-heroicons-arrow-right-on-rectangle" variant="ghost" :to="{ name: 'auth-register' }">
        Registrarse
      </UButton>
    </UContainer>

    <UContainer>
      <slot name="title">
        <h1 v-if="title" class="text-primary-600 text-2xl mb-4">
          {{ title }}
        </h1>
      </slot>
      <slot />
    </UContainer>
  </div>
</template>

<style>

</style>
