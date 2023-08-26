import { createPinia } from "pinia";
import useGlobalStore from "./modules/global";
import useAppStore from "./modules/app";
import useUserStore from "./modules/user";
import useTabBarStore from "./modules/tab-bar";

const pinia = createPinia();

export { useGlobalStore, useAppStore, useUserStore, useTabBarStore };
export default pinia;
