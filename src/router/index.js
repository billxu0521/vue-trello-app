import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("/src/views/BoardView.vue"),
      children: [
        {
          path: "task/:cardId/:taskId",
          name: "task",
          component: () => import("/src/views/TaskView.vue"),
        },
      ],
    },
  ],
});

export default router;
