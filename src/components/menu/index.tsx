import { useRoute, useRouter, RouteRecordRaw } from "vue-router";
import type { RouteMeta } from "vue-router";
import { useAppStore } from "@/store";
import { listenerRouteChange } from "@/utils/route-listener";
import { openWindow, regexUrl } from "@/utils";
import useMenuTree from "./use-menu-tree";
import './index.module.less';
import { Menu, SubMenu } from "ant-design-vue";

export default defineComponent({
  emit: ["collapse"],
  setup() {
    const appStore = useAppStore();
    const router = useRouter();
    const route = useRoute();
    const { menuTree } = useMenuTree();
    const collapsed = computed({
      get() {
        if (appStore.device === "desktop") return appStore.menuCollapse;
        return false;
      },
      set(value: boolean) {
        appStore.updateSettings({ menuCollapse: value });
      },
    });

    const topMenu = computed(() => appStore.topMenu);
    const openKeys = ref<string[]>([]);
    const selectedKey = ref<string[]>([]);

    const goto = (item: RouteRecordRaw) => {
      // Open external link
      if (regexUrl.test(item.path)) {
        openWindow(item.path);
        selectedKey.value = [item.name as string];
        return;
      }
      // Eliminate external link side effects
      const { hideInMenu, activeMenu } = item.meta as RouteMeta;
      if (route.name === item.name && !hideInMenu && !activeMenu) {
        selectedKey.value = [item.name as string];
        return;
      }
      // Trigger router change
      router.push({
        name: item.name,
      });
    };
    const findMenuOpenKeys = (target: string) => {
      const result: string[] = [];
      let isFind = false;
      const backtrack = (item: RouteRecordRaw, keys: string[]) => {
        if (item.name === target) {
          isFind = true;
          result.push(...keys);
          return;
        }
        if (item.children?.length) {
          item.children.forEach((el) => {
            backtrack(el, [...keys, el.name as string]);
          });
        }
      };
      menuTree.value.forEach((el: RouteRecordRaw) => {
        if (isFind) return; // Performance optimization
        backtrack(el, [el.name as string]);
      });
      return result;
    };
    listenerRouteChange((newRoute) => {
      const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
      if (requiresAuth && (!hideInMenu || activeMenu)) {
        const menuOpenKeys = findMenuOpenKeys(
          (activeMenu || newRoute.name) as string,
        );

        const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
        openKeys.value = [...keySet];

        selectedKey.value = [
          activeMenu || menuOpenKeys[menuOpenKeys.length - 1],
        ];
      }
    }, true);
    const setCollapse = (val: boolean) => {
      if (appStore.device === "desktop")
        appStore.updateSettings({ menuCollapse: val });
    };

    const renderSubMenu = () => {
      function travel(_route: RouteRecordRaw[], nodes = []) {
        if (_route) {
          _route.forEach((element) => {
            // This is demo, modify nodes as needed
            const icon = element?.meta?.icon
              ? () => h(resolveComponent(`${element?.meta?.icon}`))
              : null;
            const node =
              element?.children && element?.children.length !== 0 ? (
                <SubMenu
                  key={element?.name}
                  v-slots={{
                    icon,
                    title: element?.meta?.title || "",
                  }}
                >
                  {travel(element?.children)}
                </SubMenu>
              ) : (
                <Menu.Item
                  key={element?.name}
                  v-slots={{ icon }}
                  onClick={() => goto(element)}
                >
                  {element?.meta?.title || ""}
                </Menu.Item>
              );
            nodes.push(node as never);
          });
        }
        return nodes;
      }
      return travel(menuTree.value);
    };

    return () => (
      <Menu
        mode={topMenu.value ? "horizontal" : "inline"}
        v-model:collapsed={collapsed.value}
        v-model:open-keys={openKeys.value}
        show-collapse-button={appStore.device !== "mobile"}
        auto-open={false}
        selected-keys={selectedKey.value}
        auto-open-selected={true}
        level-indent={34}
        style="height: 100%;width:100%;"
        onCollapse={setCollapse}
      >
        {renderSubMenu()}
      </Menu>
    );
  },
});