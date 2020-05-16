import Vue from "vue";
import Router from "vue-router";
import TopTours from "./views/TopTours.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      component: TopTours,
      props: true,
    },
    {
      path: '/tours/',
      name: 'tours',
      component: () => import('./views/Tours.vue'),
      props: true,
    },
    {
      path: '/about/',
      name: 'about',
      component: () => import('./views/AboutUs.vue'),
      props: true,
    },
    {
      path: '/admin-panel/',
      name: 'adminPanel',
      component: () => import('./views/AdminPanel.vue'),
      props: true,
      children: [
        {
          path: 'table/:tableName',
          name: 'tableName',
          props: true,
          component: () => import('./views/TableInfo'),
        },
        {
          path: 'self-request',
          name: 'selfRequest',
          props: true,
          component: () => import('./views/SelfRequest'),
        },
      ],
    },
    {
      path: '/tour-info/:id',
      name: 'tourInfo',
      component: () => import('./views/TourInfo.vue'),
      props: true,
    },
  ],
});
