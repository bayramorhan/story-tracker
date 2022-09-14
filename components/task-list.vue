<script setup lang="ts">
import { ref, computed } from "vue";
import { debouncedWatch } from "@vueuse/core";
import { useTaskStore } from "~~/stores/task";
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline";

// Store
const taskStore = useTaskStore();
const tasks = computed(() => {
  return taskStore.tasks;
});

// Local States
const taskToEdit = ref<Task>({
  id: "",
  description: "",
  priority: -1,
});
const selectedTasks = ref([]);
const dialogRef = ref();
const editDialogRef = ref();
const dialogResult = ref("");
const indeterminate = computed(
  () =>
    selectedTasks.value.length > 0 &&
    selectedTasks.value.length < tasks.value.length
);

// Functions
const removeTask = async (id: string) => {
  dialogRef.value.openModal();
  await new Promise((resolve) => {
    debouncedWatch(
      dialogResult,
      () => {
        resolve(dialogResult.value);
      },
      { debounce: 100 }
    );
  })
    .then((prompt) => {
      if (!!prompt) {
        taskStore.REMOVE_TASK(id);
      }
      dialogResult.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
};

const onResponseReceived = (response: any) => {
  dialogResult.value = response;
};

const editTask = async (task: Task) => {
  taskToEdit.value = task;
  editDialogRef.value.openModal();
};

const onEditConfirmed = (task: Task) => {
  taskStore.UPDATE_TASK(task.id, task.priority);
};

const removeAll = async () => {
  dialogRef.value.openModal();
  await new Promise((resolve) => {
    debouncedWatch(
      dialogResult,
      () => {
        resolve(dialogResult.value);
      },
      { debounce: 100 }
    );
  })
    .then((prompt) => {
      if (!!prompt) {
        taskStore.REMOVE_ALL_TASKS();
      }
      dialogResult.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
};

// Priorities
const { data: priorities } = await useFetch("/api/priorities");
</script>

<template>
  <div>
    <edit-dialog
      :task="taskToEdit"
      ref="editDialogRef"
      @confirm-edit="onEditConfirmed"
    ></edit-dialog>
    <prompt-dialog
      ref="dialogRef"
      @prompt-response="onResponseReceived"
      :title="'Are you sure?'"
      :description="'You cannot undo this action. This user story will be deleted permamently.'"
      :confirm-text="'Yes, delete the story'"
      :rejection-text="'Cancel'"
    ></prompt-dialog>
    <transition
      mode="out-in"
      enter-active-class="transition duration-200 transform"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 transform"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div class="px-4 sm:px-0" v-if="tasks.length > 0">
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
            >
              <div
                class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
              >
                <div
                  v-if="selectedTasks.length > 0"
                  class="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16"
                >
                  <button
                    type="button"
                    class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    @click="removeAll()"
                  >
                    Delete all
                  </button>
                </div>
                <table class="min-w-full table-fixed divide-y divide-gray-300">
                  <thead class="bg-white">
                    <tr>
                      <th
                        scope="col"
                        class="relative w-12 px-6 sm:w-16 sm:px-8"
                      >
                        <input
                          type="checkbox"
                          class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6 cursor-pointer"
                          :checked="
                            indeterminate ||
                            selectedTasks.length === tasks.length
                          "
                          :indeterminate="indeterminate"
                          @change="
                            selectedTasks = ($event.target as HTMLInputElement)
                              .checked
                              ? tasks.map((t) => t.id)
                              : []
                          "
                        />
                      </th>
                      <th
                        scope="col"
                        class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        User Story
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Priority
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      ></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <transition-group
                      mode="out-in"
                      enter-active-class="transition duration-200 transform"
                      enter-from-class="opacity-0 translate-y-2"
                      enter-to-class="opacity-100 translate-y-0"
                      leave-active-class="transition duration-200 transform"
                      leave-from-class="opacity-100 translate-y-0"
                      leave-to-class="opacity-0 translate-y-2"
                    >
                      <tr
                        v-for="task in tasks"
                        :key="task.id"
                        :class="[
                          selectedTasks.indexOf(task.id) !== 1 && 'bg-gray-50',
                        ]"
                      >
                        <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                          <div
                            v-if="selectedTasks.indexOf(task.id) !== -1"
                            class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"
                          ></div>
                          <input
                            type="checkbox"
                            class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6 cursor-pointer"
                            :value="task.id"
                            v-model="selectedTasks"
                          />
                        </td>
                        <td
                          :class="[
                            'py-4 pr-3 text-sm',
                            selectedTasks.indexOf(task.id) !== -1
                              ? 'text-indigo-600'
                              : 'text-gray-900',
                          ]"
                        >
                          {{ task.description }}
                        </td>
                        <td
                          class="whitespace-nowrap py-5 text-xs w-44 flex items-center space-x-2.5"
                        >
                          <div
                            v-if="priorities"
                            class="w-2 h-2 rounded-full ring-2 ring-offset-1"
                            :class="[
                              priorities.find(
                                (item) => item.id === task.priority
                              ).color,
                            ]"
                          ></div>
                          <span>{{
                            priorities.find((item) => item.id === task.priority)
                              .title
                          }}</span>
                        </td>
                        <td class="py-4 text-sm w-20 align-top">
                          <div class="flex items-start space-x-4">
                            <button
                              class="text-gray-400 hover:text-gray-600"
                              @click="editTask(task)"
                            >
                              <PencilSquareIcon class="w-5" />
                            </button>

                            <button
                              class="text-gray-400 hover:text-gray-600"
                              @click="removeTask(task.id)"
                            >
                              <TrashIcon class="w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </transition-group>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="py-20 text-center text-sm text-gray-500">
        <p>Your user stories will be listed here.</p>
      </div>
    </transition>
  </div>
</template>
