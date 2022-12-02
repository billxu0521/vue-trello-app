<script setup>
import { ref, computed, watch } from "vue";
import { useFocus } from "@vueuse/core";
import { vOnClickOutside } from "@vueuse/components";
import { useStore } from "/src/stores";
import draggable from "vuedraggable";

const props = defineProps({
  id: String,
  title: String,
  tasks: Array,
});
// 注意，不可直接修改 props 的值
const title = ref(props.title);
const isTitleEditing = ref(false); //標題是否在編輯中

const target = ref();
useFocus(target, { initialValue: true });

const store = useStore();
const { updateListTitle, openEditTask, closeEditTask } = store;
//這是函式做法
// const saveTitle = () => {
//   isTitleEditing.value = false;
//   updateListTitle(props.id, title.value);
// };

//這是watch方式
watch(isTitleEditing, () => {
  updateListTitle(props.id, title.value);
});
</script>
<template>
  <div
    class="border rounded-sm bg-slate-200 border-gray-500 mx-2 min-w-[300px] p-2 block"
  >
    <!-- column -->
    <div
      v-if="!isTitleEditing"
      @click="isTitleEditing = true"
      class="text-ellipsis text-lg w-4/5 block overflow-hidden"
    >
      {{ title }}
    </div>
    <textarea
      v-else
      ref="target"
      v-model="title"
      @keydown.enter="isTitleEditing = false"
      v-on-click-outside="() => (isTitleEditing = false)"
      class="border-none h-8 w-full p-1 resize-none overflow-hidden block"
    ></textarea>
    <!-- tasks -->
    <!-- <TaskItem
      v-for="task in tasks"
      :key="task.id"
      v-bind="task"
      @click="openEditTask(props.id, task.id)"
    /> -->
    <!-- tasks -->
    <!-- tasks 改寫後 -->
    <draggable :list="tasks" group="task" itemKey="id" ghost-class="opacity-30">
      <template #item="{ element }">
        <TaskItem
          @click="openEditTask(props.id, element.id)"
          v-bind="element"
        />
      </template>
    </draggable>
    <!-- add new task -->
    <AddNewTask :id="props.id" />
    <!-- add new task -->
  </div>
</template>
