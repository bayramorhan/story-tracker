<script setup>
import pkg from "@/package.json";
</script>

<template>
  <div as="nav" class="bg-white shadow-sm">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <img
              class="block h-6 w-auto lg:hidden"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <img
              class="hidden h-6 w-auto lg:block"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <span class="block ml-2 font-bold">storytracker</span>
            <span class="pl-2 text-xs">v{{ pkg.version }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
