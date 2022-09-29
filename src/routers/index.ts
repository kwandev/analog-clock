import { createRouter, createWebHistory } from 'vue-router';
import routesRecords from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes: routesRecords,
});

export default router;
