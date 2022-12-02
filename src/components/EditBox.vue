<script setup>
import { ref, computed } from "vue";
import { useStore } from "/src/stores";

const store = useStore();
const { closeEditTask, updateTask, deleteTask } = store;
const currentEditTask = computed(() => store.currentEditTask);
// 避免直接對 currentEditTask 修改，⽤ ref 包裝
const title = ref(currentEditTask.value.title);
const content = ref(currentEditTask.value.content);
</script>

<template>
  <div
    @click.self="closeEditTask"
    class="fixed top-0 left-0 w-full h-full bg-slate-800 z-100 bg-opacity-70"
  >
    <div
      class="w-1/2 h-auto block relative mx-auto top-[15vh] bg-white py-8 px-12"
    >
      <div>
        <input
          ref="target"
          type="text"
          v-model="title"
          class="w-full p-2 text-xl border mb-6"
        />
      </div>

      <textarea
        v-model="content"
        class="w-full h-[300px] p-3 overflow-x-hidden overflow-y-auto resize-none border"
      ></textarea>

      <div class="text-right mt-4">
        <button
          @click="deleteTask(currentEditTask.cardId, currentEditTask.id)"
          class="border bg-rose-500 text-white py-2 px-4 hover:bg-rose-700 mr-6"
        >
          刪除
        </button>
        <button
          @click="
            updateTask(
              currentEditTask.cardId,
              currentEditTask.id,
              title,
              content
            )
          "
          class="border bg-slate-200 py-2 px-4 hover:bg-slate-400 hover:text-slate-100"
        >
          儲存送出
        </button>
      </div>
    </div>
  </div>
</template>
