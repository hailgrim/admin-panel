<script setup lang="ts">
import resourcesApi from '~/components/entities/resource/resourcesApi'

definePageMeta({
  middleware: ['auth'],
  layout: 'panel',
  name: 'resources',
  title: 'resources',
  description: 'resources',
})

const router = useRouter()
const route = useRoute()
const reqPage = ref(Number(route.query.reqPage) || 1)
const reqLimit = ref(Number(route.query.reqLimit) || 25)
const { data, execute } = resourcesApi.getList({ reqPage, reqLimit, reqCount: true })

function updateHandler(newMeta: IResListMeta<IResource>) {
  const newParams = createSearchParams({
    data: resListMetaToReq<IResource>(newMeta),
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
  <ResourceList
    :initial-rows="data?.rows"
    :initial-meta="data?.meta"
    @meta-update="updateHandler($event)"
  />
</template>
