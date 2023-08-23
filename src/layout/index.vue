<script lang="ts" setup>
import SettingDrawer from "@/components/SettingDrawer/SettingDrawer.vue";
import { AppMain, SiderBar, HeaderBar } from "./components";

const isDev = ref(true);
const settings = ref();
const handleSettingChange = () => {};
</script>

<template>
  <a-layout>
    <a-layout-header class="header-wrapper">
      <header-bar></header-bar>
    </a-layout-header>
    <a-layout class="main-content-wrapper">
      <sider-bar class="sider-bar"></sider-bar>
      <a-layout-content>
        <setting-drawer
          v-if="isDev"
          :settings="settings"
          @change="handleSettingChange"
        >
          <div style="margin: 12px 0">
            This is SettingDrawer custom footer content.
          </div>
        </setting-drawer>
        <app-main></app-main>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.header-wrapper {
  position: fixed;
  z-index: 1;
  width: 100%;
}

.sider-bar {
  height: 100%;
}

.main-content-wrapper {
  height: calc(100vh - 64px);
  margin-top: 64px;
  overflow: hidden;
}
</style>
