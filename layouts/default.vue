<script lang="ts" setup>
const { $auth } = useNuxtApp()

const logoutLoading = ref(false)

async function tryLogout() {
  logoutLoading.value = true
  $auth.logout()
  navigateTo('/')
  logoutLoading.value = false
}
</script>

<template>
  <div>
    <UContainer class="py-4 flex items-center justify-end gap-4">
      <template v-if="!$auth.isLogged.value">
        <UButton icon="i-heroicons-user" :to="{ name: 'auth-login' }">
          Iniciar sesión
        </UButton>
        <UButton icon="i-heroicons-arrow-right-on-rectangle" variant="ghost" :to="{ name: 'auth-register' }">
          Registrarse
        </UButton>
      </template>
      <UButton v-else :loading="logoutLoading" icon="i-heroicons-arrow-left-on-rectangle" variant="ghost" @click="tryLogout">
        Cerrar sesión
      </UButton>
    </UContainer>

    <UContainer>
      <slot />
    </UContainer>
  </div>
</template>
