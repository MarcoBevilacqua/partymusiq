<template>
  <div class="headerw-full md:w-auto">
    <h2
      class="text-2xl font-bold leading-7 text-white-900 sm:truncate sm:text-3xl sm:tracking-tight"
    >
      PARTYMUSIQ
    </h2>
  </div>
  <slot></slot>
  <footer>
    <span>Moofy - All right reserved</span>
  </footer>
</template>

<style>
.header {
  position: absolute;
  top: 0px;
  height: 40px;
  margin-bottom: 20px;
  width: 100%;
}
</style>
