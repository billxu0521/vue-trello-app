<script setup>
import { ref } from "vue";
import { useFocus } from "@vueuse/core";
import { vOnClickOutside } from "@vueuse/components";
import { useStore } from "/src/stores";
const props = defineProps({
  id: String,
});
const target = ref();
useFocus(target, { initialValue: true });

const newTitle = ref("");
const isTitleEditing = ref(false);

const store = useStore();
const { addTask } = store;
const addTaskHandler = () => {
  addTask(props.id, newTitle.value);
  newTitle.value = "";
  isTitleEditing.value = false;
};
</script>
<template>
  <div class="my-3">
    <div
      v-if="!isTitleEditing"
      @click="isTitleEditing = true"
      class="bg-slate-200 p-2 hover:bg-slate-300 cursor-pointer text-slate-500"
    >
      + 點擊以新增任務
    </div>
    <textarea
      v-else
      ref="target"
      v-model.trim="newTitle"
      @keydown.enter="addTaskHandler"
      v-on-click-outside="() => (isTitleEditing = false)"
      class="block w-full resize-none p-2 h-10"
      placeholder="為這張卡片輸入標題"
    ></textarea>
  </div>
</template>
