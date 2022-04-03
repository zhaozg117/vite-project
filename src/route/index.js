import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  { path: "/", component: () => import("@/views/Home.vue") },
  { path: "/myTask", component: () => import("@/views/myTask/MyTask.vue") },
  {
    path: "/assignTask",
    component: () => import("@/views/assignTask/AssignTask.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
