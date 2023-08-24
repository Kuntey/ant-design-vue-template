<template>
  <sider-menu-wrapper
    @select="onSelect"
    @open-keys="onOpenKeys"
  ></sider-menu-wrapper>
</template>

<script lang="tsx" setup>
import SiderMenuWrapper from "@/components/SiderMenu";
import {
  RouteContextProps,
  defaultRouteContext,
  routeContextInjectKey,
} from "@/components/SiderMenu/RouteContext";
import { MenuDataItem, WithFalse } from "@/config/typings";
import useMenuTree from "@/hooks/use-menu-tree";

const { menuTree } = useMenuTree<MenuDataItem[]>();

const menuData = menuTree.value;

const router = useRouter();

const routeContext = reactive<RouteContextProps>({
  ...defaultRouteContext,
  menuData,
  locale: false,
  contentWidth: "Fixed",
  selectedKeys: [],
  openKeys: [],
});
provide(routeContextInjectKey, routeContext);

const onSelect = (value: WithFalse<string[]>) => {
  routeContext.selectedKeys = value as string[];
};

const onOpenKeys = (value: WithFalse<string[]>) => {
  routeContext.openKeys = value as string[];
};

watchEffect(() => {
  if (router.currentRoute) {
    const matched = router.currentRoute.value.matched.concat();
    routeContext.selectedKeys = matched
      .filter((r) => r.name !== "index")
      .map((r) => r.path);
    routeContext.openKeys = matched
      .filter((r) => r.path !== router.currentRoute.value.path)
      .map((r) => r.path);
  }
});
</script>

<style lang="less" scoped>
.menu-wrapper {
  height: 100%;
}
</style>
