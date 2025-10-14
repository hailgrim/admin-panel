<script setup lang="ts">
import resourcesApi from '~/components/entities/resource/resourcesApi'
import rolesApi from '~/components/entities/role/rolesApi'

definePageMeta({
  middleware: ['auth'],
  layout: 'panel',
  name: 'role',
  title: 'role',
  description: 'role',
})

const route = useRoute()
const router = useRouter()
const id = String(route.params.id)
const { data: roleData, execute: roleExecute } = rolesApi.getOne(id)
const { data: resourcesData, execute: resourcesExecute } = resourcesApi.getList()

await roleExecute()

if (roleData.value === null) {
  showError({
    statusCode: 404,
  })
}

await resourcesExecute()
</script>

<template>
  <RoleUpdate
    v-if="roleData"
    :data="roleData"
    @delete="router.push(ROUTES.ui.roles)"
  />
  <v-card-title
    v-if="roleData && resourcesData"
    class="px-0 py-3"
  >
    {{ $t('resources') }}
  </v-card-title>
  <RoleRightsUpdate
    v-if="roleData && resourcesData"
    :role="roleData"
    :resources="resourcesData.rows"
  />
</template>
