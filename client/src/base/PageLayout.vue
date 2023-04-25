<template>
  <div class="relative px-6 lg:px-8">
    <div class="mx-auto py-12 sm:py-12 lg:py-12">
      <div class="hidden sm:mb-8 sm:flex">
        <div class="relative py-1 text-sm leading-6 text-gray-600">
          <h2
            class="text-2xl font-light tracking-tight text-gray-900 sm:text-4xl"
          >
            {{ title }}:
          </h2>
        </div>
      </div>
      <div class="flex flex-wrap mx-auto">
        <slot></slot>
      </div>
    </div>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>
