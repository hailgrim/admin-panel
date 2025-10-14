<script setup lang="ts">
import rolesApi from '~/components/entities/role/rolesApi'

definePageMeta({
  middleware: ['auth'],
  layout: 'panel',
  name: 'roles',
  title: 'roles',
  description: 'roles',
})

const router = useRouter()
const route = useRoute()
const reqPage = ref(Number(route.query.reqPage) || 1)
const reqLimit = ref(Number(route.query.reqLimit) || 25)
const { data, execute } = rolesApi.getList({ reqPage, reqLimit, reqCount: true })

function updateHandler(newMeta: IResListMeta<IRole>) {
  const newParams = createSearchParams({
    data: resListMetaToReq<IRole>(newMeta),
    exclude: ['total'],
    searchParams: route.fullPath.split('?')[1],
  })
  router.push('?' + newParams.toString())
}

await execute()

if (data.value === null) {
  showError({
    statusCode: 404,
  })
}
</script>

<template>
  <RoleList
    :initial-rows="data?.rows"
    :initial-meta="data?.meta"
    @meta-update="updateHandler($event)"
  />
</template>
