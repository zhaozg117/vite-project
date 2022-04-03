<script setup>
import { ref } from "vue";
import TaskList from "./TaskList.vue";
import { treeData } from "@/mock/treeData";
import { dfs1, bfs1 } from "@/utils";
const pageName = "Mytask";
const tasks = [
  { taskId: "10086", taskName: "中国移动", activitys: [] },
  { taskId: "10010", taskName: "中国联通", activitys: [] },
  { taskId: "10000", taskName: "中国电信", activitys: [] },
];
const taskListCom = ref(null);
console.log("-------aaa-------", taskListCom.value);

const open = (task) => {
  console.log(task.taskName);
  console.log("------- dfs1 -------", bfs1(treeData));
};
const check = (taskId) => {
  console.log(taskId);
};
</script>

<template>
  <div class="my-task">
    <h1>{{ pageName }}</h1>
  </div>

  <TaskList :data="tasks" ref="taskListCom" @open="open" @check="check" />

  <div class="flex">
    <div class="left flex-1">left</div>
    <div class="right flex-2">right</div>
  </div>

  <router-view></router-view>
</template>

<style scoped lang="less"></style>
