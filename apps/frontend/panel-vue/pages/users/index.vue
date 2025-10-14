<script setup lang="ts">
import usersApi from '~/components/entities/user/usersApi'

definePageMeta({
  middleware: ['auth'],
  layout: 'panel',
  name: 'users',
  title: 'users',
  description: 'users',
})

const router = useRouter()
const route = useRoute()
const reqPage = ref(Number(route.query.reqPage) || 1)
const reqLimit = ref(Number(route.query.reqLimit) || 25)
const { data, execute } = usersApi.getList({ reqPage, reqLimit, reqCount: true })

function updateHandler(newMeta: IResListMeta<IUser>) {
  const newParams = createSearchParams({
    data: resListMetaToReq<IUser>(newMeta),
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
  <UserList
    :initial-rows="data?.rows"
    :initial-meta="data?.meta"
    @meta-update="updateHandler($event)"
  />
</template>
