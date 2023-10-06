<script lang="ts" setup>
const logoutLoading = ref(false)
const authStore = useAuthStore()

const links = [
  {
    label: 'Inicio',
    icon: 'i-heroicons-home',
    to: '/',
  }, {
    label: 'Productos',
    icon: 'i-heroicons-shopping-bag',
    to: '/products',
  }, {
    label: 'Mi perfil',
    icon: 'i-heroicons-user',
    to: '/users/profile',
  }]

async function tryLogout() {
  logoutLoading.value = true
  authStore.logout()
  navigateTo('/')
  logoutLoading.value = false
}
</script>

<template>
  <UContainer class="w-full py-4 flex items-center gap-4 max-w-[1400px]">
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
  <UContainer :ui="{ constrained: false }" class="flex min-h-screen max-w-[1400px] gap-4">
    <UVerticalNavigation :links="links" class="pt-20" />

    <div class="flex flex-col flex-grow">
      <div class="flex-grow overflow-y-auto w-full">
        <slot />
      </div>
    </div>
  </UContainer>
</template>
