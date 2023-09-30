<script lang="ts" setup>
withDefaults(defineProps<{
  content: string
  buttonLabel?: string
  color?: string
  title?: string
}>(), {
  color: 'green',
  title: 'Confirmar',
})

const emit = defineEmits<{
  (event: 'success'): void
  (event: 'reject'): void
}>()

const model = ref(false)

function onSuccess() {
  model.value = false
  emit('success')
}

function onReject() {
  model.value = false
  emit('reject')
}
</script>

<template>
  <UPopover v-model="model">
    <slot />
    <template #panel>
      <UCard>
        <template #header>
          <h3 class="text-2xl font-semibold">
            {{ title }}
          </h3>
        </template>
        <slot name="content">
          {{ content }}
        </slot>

        <template #footer>
          <div class="flex gap-4 justify-end">
            <UButton icon="i-heroicons-x-mark" label="Cancelar" @click="onReject" />
            <UButton icon="i-heroicons-check" label="Confirmar" :color="color" @click="onSuccess" />
          </div>
        </template>
      </UCard>
    </template>
  </UPopover>
</template>

<style>

</style>
