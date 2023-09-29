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
</script>

<template>
  <UPopover>
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
            <UButton icon="i-heroicons-x-mark" label="Cancelar" />
            <UButton icon="i-heroicons-check" label="Confirmar" :color="color" />
          </div>
        </template>
      </UCard>
    </template>
  </UPopover>
</template>

<style>

</style>
