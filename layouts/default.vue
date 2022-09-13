<script setup>
useHead({
  htmlAttrs: {
    class: "h-full bg-gray-100",
  },
  bodyAttrs: {
    class: "h-full",
  },
});
</script>

<template>
  <div class="min-h-full">
    <layout-navigation></layout-navigation>
    <div class="py-10">
      <main>
        <div class="mx-auto max-w-6xl sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
