import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/desktop',
      children: [
        {
          path: 'desktop',
          component: () => import('@/views/desktop/DesktopHome.vue'),
          name: 'Desktop'
        }
      ]
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: () => import('@/views/TestEcharts.vue')
    },
    {
      path: '/gantt',
      name: 'gantt',
      component: () => import('@/views/program/Gantt/GanttRoom.vue')
    }
  ]
})

export default router
