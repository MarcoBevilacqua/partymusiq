<template>
  <h1>Hi, this is user {{ this.user.name }}</h1>
</template>

<script>
export default {
  props: {
    user: Object,
  },
};
</script>
