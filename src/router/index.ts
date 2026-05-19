import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CuntsCounterView from '@/views/CuntsCounterView.vue';

const router = createRouter({
    //   history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/compteur',
            name: 'counter',
            alias: [
                '/counter',
                '/cunts-counter',
            ],
            component: CuntsCounterView,
        },
    ],
});

export default router;
