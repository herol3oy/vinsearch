<script setup lang="ts">
import { ApiSource } from '~/types/api-source'
import { Data } from '~/types/data'
import { GlobalArtWork } from '~/types/global-art-work'

const artWorks = ref<GlobalArtWork[]>([])
const selectedMuseumApi = ref<ApiSource[]>([])

const route = useRoute()

onMounted(async () => {
  const baseApi = `/api/vintsearch?query=${route.params.searchQuery}`
  const res = await fetch(baseApi)
  const { data }: Data = await res.json()

  artWorks.value = data
})

const filteredArtWorks = computed(() => {
  if (!selectedMuseumApi.value.length) {
    return artWorks.value
  } else {
    return artWorks.value.filter((artWork) =>
      selectedMuseumApi.value.includes(artWork.apiSource),
    )
  }
})

const createBadge = computed(() => {
  const badgeClasses: Record<ApiSource, string> = {
    [ApiSource.ART_INSTITUTE_OF_CHICAGO]: 'badge-info',
    [ApiSource.CLEVELAND_MUSEUM_OF_ART]: 'badge-primary',
    [ApiSource.RIJKSMUSEUM]: 'badge-secondary',
    [ApiSource.NYPL]: 'badge-accent',
    [ApiSource.HARVARD]: 'badge-warning',
  }

  return (apiSource: ApiSource) => badgeClasses[apiSource]
})

const resetFilter = () => {
  selectedMuseumApi.value = []
}
</script>

<template>
  <div>
    <form
      class="p-10 flex flex-col md:flex-row justify-center gap-5 align-middle items-center"
    >
      <label
        v-for="(apiLabel, apiValue) in ApiSource"
        :key="apiValue"
        class="flex items-center gap-5"
      >
        <input
          v-model="selectedMuseumApi"
          class="checkbox checkbox-primary"
          type="checkbox"
          :value="apiLabel"
        >
        {{ apiLabel }}
      </label>
      <button
        class="btn btn-active btn-ghost"
        @click="resetFilter"
      >
        Reset
      </button>
    </form>
    <section class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5">
      <figure
        v-for="artWork in filteredArtWorks"
        :key="artWork.id"
      >
        <NuxtLink
          :to="artWork.pageUrl"
          target="_blank"
        >
          <NuxtImg
            :src="artWork.imageUrl"
            :alt="artWork.title"
            quality="10"
            placeholder="https://placehold.co/600x400"
          />
          <figcaption>
            {{ artWork.title }}
          </figcaption>
        </NuxtLink>
        <small :class="`badge badge-outline ${createBadge(artWork.apiSource)}`">{{ artWork.apiSource }}
        </small>
      </figure>
    </section>
  </div>
</template>
