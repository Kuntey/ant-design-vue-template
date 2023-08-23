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
  <a-app>
    <a-config-provider :prefix-cls="'n'" :theme="token" :locale="locale">
      <router-view></router-view>
    </a-config-provider>
  </a-app>
</template>

<style>
/* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.nav {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 40px;
    font-size: 32px;
}

.content {
    margin-top: 60px;
} */
</style>
