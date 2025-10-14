<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'panel',
  name: 'newResource',
  title: 'newResource',
  description: 'newResource',
})

const router = useRouter()
</script>

<template>
  <ResourceCreate @create="router.push(ROUTES.ui.resource($event.id))" />
</template>
