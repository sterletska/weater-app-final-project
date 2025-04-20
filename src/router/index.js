import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import HourlyView from '../views/HourlyView.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    {
        path: '/forecast',
        name: 'FiveDayForecast',
        component: () => import('../views/FiveDayForecast.vue'),
        props: true
    },
    { path: '/hourly', component: HourlyView, props: true },
    { path: '/:catchAll(.*)', redirect: '/' }
];

export default createRouter({
    history: createWebHistory(),
    routes
});