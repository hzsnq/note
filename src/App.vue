<script setup lang="ts">
import { useTheme } from '@/hooks/useTheme';

const { initTheme } = useTheme();
initTheme();
</script>

<template>
  <router-view></router-view>
</template>

<style scoped lang="scss"></style>
