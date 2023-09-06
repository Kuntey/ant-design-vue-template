import { notification } from "ant-design-vue";
import type { RouteRecordNormalized } from "vue-router";
import defaultSettings from "@/config/settings.json";
import { getMenuList } from "@/api/user";
import { AppState } from "./types";

const useAppStore = defineStore("app", {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
    appDevice(state: AppState) {
      return state.device;
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[];
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = "dark";
        document.body.setAttribute("theme", "dark");
      } else {
        this.theme = "light";
        document.body.removeAttribute("theme");
      }
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value;
    },
    async fetchServerMenuConfig() {
      try {
        notification.info({
          key: "menuNotice", // Keep the instance id the same
          message: "loading",
        });
        const { data } = await getMenuList();
        this.serverMenu = data;
        notification.success({
          key: "menuNotice",
          message: "success",
        });
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        notification.error({
          key: "menuNotice",
          message: "error",
        });
      }
    },
    clearServerMenu() {
      this.serverMenu = [];
    },
  },
});

export default useAppStore;
