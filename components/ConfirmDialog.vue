<script lang="ts" setup>
import type { MaybePromise } from '~/server/utils/utils.interface'

const props = withDefaults(defineProps<{
  content: string
  color?: string
  title?: string
  onSuccess?: () => MaybePromise<boolean>
  onReject?: () => MaybePromise<boolean>
}>(), {
  color: 'green',
  title: 'Confirmar',
})

const model = ref(false)
const loading = ref(false)

async function onSuccess() {
  loading.value = true
  try {
    const success = await props.onSuccess?.()

    if (success === false)
      return
  }
  finally {
    loading.value = false
  }

  model.value = false
}

async function onReject() {
  loading.value = true
  try {
    const success = await props.onReject?.()

    if (success === false)
      return
  }
  finally {
    loading.value = false
  }

  model.value = false
}
</script>

<template>
  <Dialog v-model="model" :title="title">
    <template #activator="{ on }">
      <slot name="activator" :on="on" />
    </template>
    <slot>
      {{ content }}
    </slot>

    <template #actions>
      <div class="flex gap-4 justify-end">
        <UButton icon="i-heroicons-x-mark" :loading="loading" label="Cancelar" @click="onReject" />
        <UButton icon="i-heroicons-check" :loading="loading" label="Confirmar" :color="color" @click="onSuccess" />
      </div>
    </template>
  </Dialog>
</template>

<style>

</style>
