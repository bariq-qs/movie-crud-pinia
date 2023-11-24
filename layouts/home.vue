<template>
  <div class="home-layouts">
    <header class="layout-topbar">
      <span class="title" v-if="!slots['header-content']">Movie Collection</span>
      <slot name="header-content" v-else />
    </header>
    <article class="content">
      <slot />
    </article>
    <footer class="footer">
      <div class="">© 2023 Movie Collection. All rights reserved.</div>
      <div class="">Made with Vue js</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const slots = useSlots()
</script>

<style lang="scss">
@import '@/assets/styles/scss/layouts/home.scss';
</style>
