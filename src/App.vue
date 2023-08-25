<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import GlobalSetting from "@/components/global-setting/index.vue";
import token from "@/assets/theme/default.json";
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import useLocale from "@/hooks/locale";

import { theme } from "ant-design-vue";
import { useAppStore } from "./store";

const appStore = useAppStore();
const myTheme = computed(() => {
  return appStore.theme === "dark"
    ? theme.darkAlgorithm
    : theme.defaultAlgorithm;
});

dayjs.locale("zh");

const { currentLocale } = useLocale();
const locale = computed(() => {
  switch (currentLocale.value) {
    case "zh-CN":
      return zhCN;
    case "en-US":
      return enUS;
    default:
      return enUS;
  }
});
</script>

<template>
  <a-config-provider
    :theme="{ ...token, ...{ algorithm: myTheme } }"
    :locale="locale"
  >
    <a-app>
      <router-view></router-view>
      <global-setting />
    </a-app>
  </a-config-provider>
</template>
