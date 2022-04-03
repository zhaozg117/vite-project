<script setup>
import { useSlots, useAttrs, defineExpose, ref } from "vue";
const slots = useSlots();
const attrs = useAttrs();
const pageName = "TaskList";
const props = defineProps({
  data: { type: Array },
});

const emitEv = defineEmits(["open", "check"]);

const msg = "xxxxxx";

const clickTask = (item) => {
  emitEv("open", item);
  emitEv("check", item.taskId);
};
defineExpose({
  msg,
});
</script>

<template>
  <div class="task-list">
    <div
      @click="clickTask(item)"
      class="f-16 c-dark my-5 hover:bg-gray-400"
      :key="item.taskId"
      v-for="item in props.data"
    >
      {{ item.taskName }}
    </div>
  </div>
</template>

<style scoped lang="less"></style>
