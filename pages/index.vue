<script setup>
import pkg from "@/package.json";

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div>
    <Title>Story Tracker v{{ pkg.version }}</Title>
    <header>
      <h1 class="font-bold leading-tight tracking-tight text-gray-900">
        New User Story
      </h1>
    </header>

    <div class="px-6 pt-6 pb-8 rounded border bg-white shadow-sm mt-4">
      <task-form></task-form>
    </div>

    <task-list></task-list>
  </div>
</template>
