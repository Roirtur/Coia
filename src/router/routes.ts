import { createRouter, createWebHistory } from "vue-router";

import NotFound from "../components/NotFound.vue";
import Home from "../components/StatusPage.vue";
import SkillsVue from "../components/SkillsView.vue";
import InventoryView from "../components/InventoryView.vue";
import MarketView from "../components/MarketView.vue";
import MapView from "../components/MapView.vue";
import NotesView from "../components/NotesView.vue";

const routes = [
  {
    path: "/",
    name: "StatusPage",
    component: Home,
  },
  {
    path: "/skills",
    name: "Skills",
    component: SkillsVue,
  },
  {
    path: "/notes",
    name: "Notes",
    component: NotesView,
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: InventoryView,
  },
  {
    path: "/market",
    name: "Market",
    component: MarketView,
  },
  {
    path: "/map",
    name: "WorldMap",
    component: MapView,
  },

  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
