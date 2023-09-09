<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { ApiSource } from '../types/api-source';

const searchQuery = ref('');
const selectedApiValue = ref<ApiSource>(ApiSource.ALL_SOURCES);

const router = useRouter();

async function onSubmitForm() {
  return await router.push(
    `/vintsearch/${searchQuery.value}?apiSource=${selectedApiValue.value}`,
  );
}
</script>

<template>
  <form @submit.prevent="onSubmitForm">
    <input
      v-model="searchQuery"
      placeholder="Type a keyword (e.g: Vincent van Gogh, Andy Warhol, nature, sky, etc)"
    >

    <label for="api-source-select">Select a source:</label>
    <select
      v-model="selectedApiValue"
      name="api-source"
    >
      <option
        v-for="apiValue in ApiSource"
        :key="apiValue"
        :value="apiValue"
      >
        {{ apiValue }}
      </option>
    </select>

    <button type="submit">
      Search
    </button>
  </form>
</template>
