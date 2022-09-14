<script setup lang="ts">
import { useTaskStore } from "~~/stores/task";
import { v4 as uuid } from "uuid";

const task = reactive<Task>({
  id: "",
  description: "",
  priority: -1,
});
const errors = ref<ValidationError[]>([]);
const taskStore = useTaskStore();

const submitCallback = () => {
  errors.value = [];

  if (!task.description) {
    errors.value.push({
      tag: "description",
      text: "Please enter story description.",
    });
  }

  if (task.priority < 0) {
    errors.value.push({
      tag: "priority",
      text: "Please choose a valid priority.",
    });
  }

  if (task.description.length < 10 && task.description.length > 0) {
    errors.value.push({
      tag: "description",
      text: "Your story description is too short.",
    });
  }

  if (errors.value.length < 1) {
    task.id = uuid();
    taskStore.ADD_TASK({ ...task });
    task.description = "";
    task.priority = -1;
  }
};
</script>

<template>
  <div>
    <form
      action=""
      class="flex flex-col md:flex-row items-center md:space-x-4 space-y-2.5 md:space-y-0"
      @submit.prevent="submitCallback"
    >
      <div class="flex-1 w-full md:w-auto">
        <label for="title" class="block mb-1.5 text-sm font-medium"
          >Story Description</label
        >
        <input
          type="text"
          id="title"
          autocomplete="current-password"
          spellcheck="false"
          class="border rounded w-full text-sm"
          :class="[
            errors.length > 0 &&
            errors.findIndex((item) => item.tag === 'description') !== -1
              ? 'border-red-600 text-red-600 focus:border-gray-300 focus:text-gray-700'
              : 'border-gray-300',
          ]"
          v-model="task.description"
          @input="errors = errors.filter((item) => item.tag !== 'description')"
        />
      </div>
      <div class="w-full md:w-56">
        <label for="priority" class="block mb-1.5 text-sm font-medium"
          >Priority</label
        >
        <select
          name=""
          id="priority"
          class="border rounded w-full text-sm"
          :class="[
            errors.length > 0 &&
            errors.findIndex((item) => item.tag === 'priority') !== -1
              ? 'border-red-600 text-red-600 focus:border-gray-300 focus:text-gray-700'
              : 'border-gray-300',
          ]"
          v-model="task.priority"
          @change="errors = errors.filter((item) => item.tag !== 'priority')"
        >
          <option :value="-1">Please choose</option>
          <option :value="0">Nice to Have</option>
          <option :value="1">Should Have</option>
          <option :value="2">Must Have</option>
        </select>
      </div>
      <div>
        <label for="" class="block">&nbsp;</label>
        <button
          type="submit"
          class="bg-indigo-600 px-4 py-2.5 rounded text-teal-50 text-sm font-medium hover:bg-indigo-700"
        >
          Create User Story
        </button>
      </div>
    </form>

    <transition
      enter-active-class="transition duration-200 transform"
      enter-from-class="opacity-0 -translate-x-2"
      enter-to-class="opacity-100 translate-x-0"
    >
      <div v-if="errors?.length > 0">
        <ul class="text-sm mt-4 text-red-600 list-disc ml-4 space-y-1.5">
          <li v-for="err in errors" :key="err.text">
            {{ err.text }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
