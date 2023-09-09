<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { GlobalArtWork } from '~/types/global-art-work';

const artWorks = ref<GlobalArtWork[]>([]);

const route = useRoute();

onMounted(async () => {
  const res = await fetch(
    `/api/vinsearch?param=${[route.params.searchQuery, route.query.apiSource]}`,
  );
  const { data } = await res.json();
  artWorks.value = data;
});
</script>

<template>
  <div>
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
  </div>
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
