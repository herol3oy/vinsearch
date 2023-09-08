<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
</script>

<template>
  <input
    v-model="searchQuery"
    placeholder="Type a keyword (e.g: Vincent van Gogh, Andy Warhol, nature, sky, etc"
  >
</template>
