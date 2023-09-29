<script lang="ts" setup>
const logoutLoading = ref(false)
const authStore = useAuthStore()

async function tryLogout() {
  logoutLoading.value = true
  authStore.logout()
  navigateTo('/')
  logoutLoading.value = false
}
</script>

<template>
  <div class="h-screen flex flex-col flex-grow">
    <UContainer class="w-full py-4 flex items-center gap-4">
      <UButton class="me-auto" icon="i-heroicons-home" variant="ghost" :to="{ name: 'index' }">
        Inicio
      </UButton>
      <template v-if="!authStore.isLogged">
        <UButton icon="i-heroicons-arrow-right-on-rectangle" variant="ghost" :to="{ name: 'auth-register' }">
          Registrarse
        </UButton>
        <UButton icon="i-heroicons-user" :to="{ name: 'auth-login' }">
          Iniciar sesión
        </UButton>
      </template>
      <UButton v-else :loading="logoutLoading" icon="i-heroicons-arrow-left-on-rectangle" variant="ghost" @click="tryLogout">
        Cerrar sesión
      </UButton>
    </UContainer>

    <UContainer class="flex-grow overflow-y-auto w-full">
      <slot />
    </UContainer>
  </div>
</template>
