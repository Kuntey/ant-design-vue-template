<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import token from "@/assets/theme/default.json";
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh");
const locale = ref(zhCN);
</script>

<template>
  <a-config-provider :prefix-cls="'n'" :theme="token" :locale="locale">
    <a-app>
      <router-view></router-view>
    </a-app>
  </a-config-provider>
</template>
