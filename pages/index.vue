<template>
  <UContainer class="space-y-4">
    <h1 class="text-primary-500 text-xl">
      Users
    </h1>
    <p>
      Manage all your users
    </p>
    <UTable :rows="data" :columns="columns" class="rounded border border-gray-800" >
    <template #actions-data>
      <UButtonGroup>
        <UButton variant="soft" color="green" icon="i-heroicons-pencil" />
        <UButton variant="soft" color="red" icon="i-heroicons-trash" />
      </UButtonGroup>
    </template>
    </UTable>

    <UButton label="Add User" class="mt-8" icon="i-heroicons-plus-circle" @click="isOpen = true" />
    <UModal v-model="isOpen">
      <UCard>
        <form @submit.prevent="submit" class="space-y-4 max-w-md">
          <UFormGroup label="Name" name="name">
            <UInput v-model="form.name" placeholder="Name" />
          </UFormGroup>
          <UFormGroup label="Email" name="email">
            <UInput v-model="form.email" placeholder="Email" />
          </UFormGroup>
          <UButton :loading="pending" label="Save" icon="i-heroicons-check-circle" type="submit" />
        </form>
      </UCard>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
const { data, refresh, pending } = useFetch('/api/users')

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'created_at', label: 'Created At' },
  { key: 'actions', label: 'Actions' }
]

const defaultForm = {
  name: '',
  email: '',
}

const form = ref({ ...defaultForm })
const isOpen = ref(false)

const submit = async () => {
  pending.value = true
  const { error } = await useFetch('/api/users', {
    method: 'POST',
    body: form.value,
  })
  if (error.value) {
    useToast().add({
      title: 'Error',
      description: error.value.message,
    })

    pending.value = false
    return
  }
  isOpen.value = false
  refresh()
}
</script>



<style></style>
