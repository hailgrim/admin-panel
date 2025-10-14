<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'panel',
  name: 'newRole',
  title: 'newRole',
  description: 'newRole',
})

const router = useRouter()
</script>

<template>
  <RoleCreate @create="router.push(ROUTES.ui.role($event.id))" />
</template>
