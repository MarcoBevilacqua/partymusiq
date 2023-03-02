<template>
  <div>
    <p>Hi, this is Party {{ this.$route.params.id }}</p>
  </div>
  <div class="w-full">
    <router-link to="/">Go Back</router-link>
  </div>
</template>

<script>
import BaseLayout from "../../../base/BaseLayout.vue";
export default {
  components: {
    BaseLayout,
  },
};
</script>
