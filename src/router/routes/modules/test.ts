import { DEFAULT_LAYOUT } from "../base";
import { AppRouteRecordRaw } from "../types";

const TEST: AppRouteRecordRaw = {
  path: "/test-page",
  name: "TestPage",
  redirect: "/test-page/index",
  component: DEFAULT_LAYOUT,
  meta: {
    title: "测试页面",
    requiresAuth: true,
    icon: "HomeOutlined",
    order: 3,
    hideChildrenInMenu: true,
    ignoreCache: true,
    activeMenu: "TestPage",
  },
  children: [
    {
      path: "index",
      name: "TestPageIndex",
      component: () => import("@/pages/test/index.vue"),
      //   meta: {
      //     requiresAuth: true,
      //     roles: ["*"],
      //     ignoreCache: true,
      //   },
    },
  ],
};

export default TEST;
