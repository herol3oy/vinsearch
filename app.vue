<script setup lang="ts">
import { ref } from 'vue';

import { GlobalArtWork } from '~/types/global-art-work';

const searchQuery = ref('');
const artWorks = ref<GlobalArtWork[]>([]);

async function requestDataHandle() {
  // const res = await fetch(`/api/rijks?param=${searchQuery.value}`);
  // const res = await fetch(`/api/cleveland?param=${searchQuery.value}`);
  const res = await fetch(`/api/ai-chicago?param=${searchQuery.value}`);
  const { data } = await res.json();
  artWorks.value = data;
}
</script>

<template>
  <input
    v-model="searchQuery"
    placeholder="Type a keyword (e.g: Vincent van Gogh, Andy Warhol, nature, sky, etc)"
  >
  <button
    type="button"
    @click="requestDataHandle"
  >
    Search
  </button>

  <section>
    <figure
      v-for="artWork in artWorks"
      :key="artWork.title"
    >
      <NuxtImg
        :src="artWork.imageUrl"
        :alt="artWork.title"
        quality="10"
        placeholder="https://placehold.co/600x400"
      />
      <figcaption>{{ artWork.title }}</figcaption>
    </figure>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

img {
  width: 10rem;
}
</style>
