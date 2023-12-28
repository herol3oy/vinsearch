<script setup lang="ts">
import { ApiSource } from '~/types/api-source'

const userSearchQuery = ref('')
const router = useRouter()

const onSubmitForm = async () => {
  const baseApiUrl = `/vintsearch/${userSearchQuery.value}`
  return await router.push(baseApiUrl)
}
</script>

<template>
  <main class="flex justify-center items-center min-h-screen p-5">
    <section class="flex flex-col gap-5">
      <div class="flex flex-col justify-center items-center gap-5">
        <img
          class="w-40 h-4w-40"
          src="~/assets/vincent.png"
          alt="Vincent van Gogh"
        >
        <h1 class="text-5xl font-extrabold text-center">
          VintSearch
        </h1>
        <p class="text-center text-2xl w-full md:w-3/4">
          Vintsearch helps you to search through the artifacts of different
          museums that provided public access to their API
        </p>
      </div>
      <form
        class="flex p-5 justify-center items-center flex-col md:flex-row gap-5"
        @submit.prevent="onSubmitForm"
      >
        <input
          v-model="userSearchQuery"
          class="input w-full input-bordered input-primary max-w-xs"
          placeholder="Type a keyword e.g: sky, bird"
        >
        <button
          class="btn btn-primary"
          type="submit"
        >
          Search
        </button>
      </form>
      <section class="flex flex-col items-center gap-2 justify-center">
        <h1 class="font-bold">
          Available resources:
        </h1>
        <small
          v-for="(api, key) in ApiSource"
          :key="key"
        >
          {{ api }}
        </small>
      </section>
    </section>
  </main>
</template>
