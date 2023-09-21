<script setup lang="ts">
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
          Vintsearch helps you to search through the artifacts of differnet
          museums that provided public acesse to their API
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
      <small class="text-center">
        Rijksmuseum • The Art Institute of Chicago • The Cleveland Museum of Art
        <br>
        and more are coming...
      </small>
    </section>
  </main>
</template>
