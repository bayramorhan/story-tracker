<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { vOnClickOutside } from "@vueuse/components";
import { debouncedWatch } from "@vueuse/shared";

const props = defineProps(["modelValue", "errors"]);
const emits = defineEmits(["update:modelValue"]);

const open = ref(false);
const selection = ref();

const { data: priorities } = await useFetch("/api/priorities");

const closeSelectbox = () => {
  open.value = false;
};

debouncedWatch(
  selection,
  () => {
    emits("update:modelValue", selection.value.id);
  },
  { debounce: 100 }
);

defineExpose({ selection });
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="border rounded px-4 py-2 text-sm w-full text-left cursor-pointer flex items-center justify-between hover:bg-gray-50 space-x-2"
      :class="[
        errors.length > 0 &&
        errors.findIndex((item) => item.tag === 'priority') !== -1
          ? 'border-red-600 text-red-600 focus:border-gray-300 focus:text-gray-700'
          : 'border-gray-300',
      ]"
      @click="open = !open"
    >
      <div v-if="selection" class="flex items-center space-x-2.5">
        <div
          class="w-2 h-2 rounded-full ring-2 ring-offset-1"
          :class="[selection.color]"
        ></div>
        <span>{{ selection.title }}</span>
      </div>

      <span v-else>Please choose</span>

      <ChevronDownIcon class="w-4" />
    </button>

    <transition
      enter-active-class="transition duration-100 transform"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-100 transform"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div
        class="absolute bg-white w-full top-full mt-1 shadow-lg z-50"
        v-on-click-outside="closeSelectbox"
        v-if="open"
      >
        <ul class="text-sm py-2">
          <li
            v-for="priority in priorities"
            :key="priority.id"
            class="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer flex items-center space-x-3"
            @click="
              selection = priority;
              open = false;
            "
          >
            <div
              class="w-2 h-2 rounded-full ring-2 ring-offset-1"
              :class="[priority.color]"
            ></div>
            <span>{{ priority.title }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
