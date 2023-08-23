import { DEFAULT_LAYOUT } from "../base";
import { AppRouteRecordRaw } from "../types";

const DATAPREPROCESSING: AppRouteRecordRaw = {
  path: "/table",
  name: "Table",
  component: DEFAULT_LAYOUT,
  meta: {
    title: "表格页",
    icon: "HomeOutlined",
    requiresAuth: true,
    order: 7,
    ignoreCache: true,
  },
  children: [
    {
      path: "info",
      name: "Info",
      component: () => import("@/pages/table/index.vue"),
      meta: {
        title: "表格1",
        requiresAuth: true,
        roles: ["*"],
        ignoreCache: true,
      },
    },
    {
      path: "setting",
      name: "Setting",
      component: () => import("@/pages/test/index.vue"),
      meta: {
        title: "表格2",
        requiresAuth: true,
        roles: ["*"],
        ignoreCache: true,
      },
    },
  ],
};

export default DATAPREPROCESSING;
