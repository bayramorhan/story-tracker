import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([])

    const ADD_TASK = (task:Task) => {
        tasks.value.push(task);
    }

    const REMOVE_TASK = (id:string) => {
        tasks.value = tasks.value.filter(item => item.id !== id)
    }

    const REMOVE_ALL_TASKS = () => {
        tasks.value = [];
    }

    const UPDATE_TASK =(id: string, priority: number) => {
        let find = tasks.value.find(item => item.id === id);
        find.priority = priority;
    }
  
    return { tasks, ADD_TASK, REMOVE_ALL_TASKS, REMOVE_TASK, UPDATE_TASK }
  })