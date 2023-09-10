<script setup lang="ts">
import { ApiSource } from '~/types/api-source';
import { Data } from '~/types/data';
import { GlobalArtWork } from '~/types/global-art-work';

const artWorks = ref<GlobalArtWork[]>([]);
const selectedMuseumApi = ref<ApiSource[]>([]);

const route = useRoute();

onMounted(async () => {
  const baseApi = `/api/vintsearch?query=${route.params.searchQuery}`;
  const res = await fetch(baseApi);
  const { data }: Data = await res.json();

  artWorks.value = data;
});

const filteredArtWorks = computed(() => {
  if (
    !selectedMuseumApi.value.length ||
    selectedMuseumApi.value.includes(ApiSource.ALL_SOURCES)
  ) {
    return artWorks.value;
  } else {
    return artWorks.value.filter((artWork) =>
      selectedMuseumApi.value.includes(artWork.apiSource),
    );
  }
});
</script>

<template>
  <section>
    <label
      v-for="(apiLabel, apiValue) in ApiSource"
      :key="apiValue"
    >
      <input
        v-model="selectedMuseumApi"
        type="checkbox"
        :value="apiLabel"
      >
      {{ apiLabel }}
    </label>
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
      <small>Source: {{ artWork.apiSource }}</small>
    </figure>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

figure {
  background-color: azure;
  padding: 1rem;
}

img {
  width: 10rem;
}

small {
  background-color: lightcoral;
  padding: 0.2rem;
  border-radius: 2rem;
}
</style>
