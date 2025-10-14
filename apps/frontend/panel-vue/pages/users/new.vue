<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'panel',
  name: 'newUser',
  title: 'newUser',
  description: 'newUser',
})

const router = useRouter()
</script>

<template>
  <UserCreate @create="router.push(ROUTES.ui.user($event.id))" />
</template>
