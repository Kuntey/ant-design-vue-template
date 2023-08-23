<template>
  <sider-menu-wrapper></sider-menu-wrapper>
</template>

<script lang="tsx" setup>
import SiderMenuWrapper from "@/components/SiderMenu";
import {
  RouteContextProps,
  defaultRouteContext,
  routeContextInjectKey,
} from "@/components/SiderMenu/RouteContext";
import { MenuDataItem } from "@/components/SiderMenu/typings";
import useMenuTree from "@/hooks/use-menu-tree";

const { menuTree } = useMenuTree<MenuDataItem[]>();

const menuData = menuTree.value;

const routeContext = reactive<RouteContextProps>({
  ...defaultRouteContext,
  menuData,
  selectedKeys: ["111"],
  openKeys: ["222"],
  locale: false,
  contentWidth: "Fixed",
  //   ...(pick(toRefs(props), [
  //     'locale',
  //     'menuData',
  //     'openKeys',
  //     'selectedKeys',
  //     'contentWidth',
  //     'disableMobile',
  //     'fixSiderbar',
  //     'fixedHeader',
  //     'headerHeight',
  //     // 'hasSideMenu',
  //     // 'hasHeader',
  //     // 'hasFooter',
  //     // 'hasFooterToolbar',
  //     // 'setHasFooterToolbar',
  //   ]) as any),
  //   isMobile,
  //   siderWidth,
  //   breadcrumb,
  //   flatMenuData,
  //   hasSide,
  //   hasHeader: true,
  //   flatMenu: hasFlatMenu,
});
provide(routeContextInjectKey, routeContext);
</script>

<style lang="less" scoped>
.menu-wrapper {
  height: 100%;
}
</style>
