<template>
  <base-layout>
    <main>
      <router-view></router-view>
    </main>
  </base-layout>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>

<script>
import BaseLayout from "./base/BaseLayout.vue";

export default {
  components: {
    BaseLayout,
  },
};
</script>
