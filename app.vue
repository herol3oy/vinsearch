<script setup lang="ts">
import { ref } from 'vue';

import { GlobalArtWork } from '~/types/global-art-work';

const searchQuery = ref('');
const artWorks = ref<GlobalArtWork[]>([]);

async function requestDataHandle() {
  const res = await fetch(`/api/vinsearch?param=${searchQuery.value}`);
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
        <figcaption>{{ artWork.title }}</figcaption>
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
