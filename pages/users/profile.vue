<script setup lang="ts">
import { productMarkets } from '~/components/Products/Form.vue'

definePageMeta({
  middleware: ['auth'],
})

useHead({
  title: 'Perfil',
})

const authStore = useAuthStore()

const user = ref(toRaw(authStore.user!))

const { execute, error, data } = updateUser(user)

async function onSaveUser() {
  await execute()
  if (error.value) {
    displayErrorFromApi(error.value)
    return
  }

  authStore.user = data.value

  useToast().add({
    title: 'Perfil actualizado',
    description: 'Tu perfil ha sido actualizado correctamente',
  })
}
</script>

<template>
  <img class="rounded-full mx-auto max-w-80 max-h-80 object-cover mt-8" src="https://images.unsplash.com/photo-1488161628813-04466f872be2" alt="Avatar" height="320" width="320">

  <div class="overflow-hidden mt-8 border rounded-xl max-w-lg mx-auto">
    <div class="p-4 flex gap-4 items-center">
      <h3 class="text-xl font-semibold mr-4">
        Email:
      </h3>  {{ user.email }}
    </div>
    <hr>
    <div class="p-4 flex gap-4 items-center">
      <h3 class="text-xl font-semibold">
        Nombre:
      </h3> <UInput v-model="user.name" variant="none" size="xl" placeholder="Por definir" />
    </div>
    <hr>
    <div class="p-4 flex gap-4 items-center">
      <h3 class="text-xl font-semibold">
        Teléfono:
      </h3> <UInput v-model="user.phone" variant="none" size="xl" type="tel" placeholder="Por definir" />
    </div>
  </div>

  <div class="overflow-hidden mt-20 border rounded-xl max-w-lg mx-auto">
    <div class="p-4 flex gap-4 items-center">
      <h3 class="text-xl font-semibold">
        Mercado preferido:
      </h3>  <USelect v-model="user.default_market" :options="productMarkets" variant="none" size="xl" placeholder="Por definir" />
    </div>
    <hr>
    <div class="p-4 flex gap-4 items-center">
      <h3 class="text-xl font-semibold">
        Dirección:
      </h3> <UInput v-model="user.address" variant="none" size="xl" placeholder="Por definir" />
    </div>
  </div>

  <div class="flex justify-end">
    <UButton size="xl" @click="onSaveUser">
      Guardar
    </UButton>
  </div>
</template>
