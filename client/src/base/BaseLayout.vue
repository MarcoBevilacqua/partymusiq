<template>
  <div class="isolate bg-white">
    <div
      class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      console.log("redirecting to login...");
      this.$router.push("/login");
    },
  },
};
</script>
