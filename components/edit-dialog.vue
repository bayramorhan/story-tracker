<script setup lang="ts">
import { PropType, ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const emits = defineEmits(["confirm-edit", "cancel-edit"]);

const isOpen = ref(false);

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
});

const editedTask = reactive<Task>({
  id: "",
  description: "",
  priority: -1,
});

function closeModal() {
  isOpen.value = false;
}

function confirmEdit() {
  emits("confirm-edit", editedTask);
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

watchEffect(() => {
  editedTask.id = props.task.id;
  editedTask.priority = props.task.priority;
});

defineExpose({ openModal });
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle class="font-semibold">Edit User Story</DialogTitle>
              <div class="mt-2">
                <label
                  for=""
                  class="block mb-2 text-sm font-medium text-gray-500"
                  >Story Description</label
                >
                <textarea
                  type="text"
                  class="text-sm text-gray-500 w-full border border-gray-300 rounded cursor-not-allowed resize-none"
                  disabled
                  >{{ task.description }}</textarea
                >
              </div>

              <div class="mt-6">
                <label
                  for=""
                  class="block mb-2 text-sm font-medium text-gray-500"
                  >Priority</label
                >
                <select
                  name=""
                  id="priority"
                  class="border rounded w-full text-sm border-gray-300"
                  v-model="editedTask.priority"
                >
                  <option :value="0">Nice to Have</option>
                  <option :value="1">Should Have</option>
                  <option :value="2">Must Have</option>
                </select>
              </div>

              <div class="mt-8 space-x-2.5">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal()"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  @click="confirmEdit()"
                >
                  Save Changes
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
