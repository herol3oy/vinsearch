<script setup lang="ts">
const userSearchQuery = ref('')
const router = useRouter()

const onSubmitForm = async () => {
  const baseApiUrl = `/vintsearch/${userSearchQuery.value}`
  return await router.push(baseApiUrl)
}
</script>

<template>
  <form @submit.prevent="onSubmitForm">
    <input
      v-model="userSearchQuery"
      placeholder="Type a keyword e.g: Vincent van Gogh, nature, etc"
    >
    <button type="submit">
      Search
    </button>
  </form>
</template>
