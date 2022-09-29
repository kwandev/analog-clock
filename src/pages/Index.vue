<template>
  <main class="page home">
    <Clock :tooltip="true" />
  </main>
</template>

<script setup lang="ts">
import Clock from '@/components/Clock.vue';
</script>

<style lang="scss">
.page.home {
  padding: px(50);
}
</style>
