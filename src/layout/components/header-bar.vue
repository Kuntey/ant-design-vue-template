<script lang="ts" setup>
import { App } from "ant-design-vue";

// defineProps<{}>();

const { message, modal, notification } = App.useApp();

const userName = ref<string>();
const userEmail = ref<string>();

const getPopupContainer = () => {
  // return document.querySelector('.main-content-wrapper')
  return document.body;
};

const logout = () => {
  message.info("退出登录");
};
</script>

<template>
  <a-row>
    <a-col flex="auto">
      <div class="flex flex-col">
        <div class="flex flex-row">
          <div class="flex-col">
            <div class="logo" />
          </div>
          <span class="font-bold font-size-[16px]">222</span>
        </div>
      </div>
    </a-col>
    <a-col flex="none">
      <a-dropdown
        placement="bottomRight"
        :trigger="['click']"
        overlay-class-name="user-dropdown-menu"
        :overlay-style="{ top: '69px' }"
        :get-popup-container="getPopupContainer"
      >
        <span class="ant-dropdown-link" @click.prevent>
          <a-avatar>
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <span class="">{{ userEmail || "-" }}</span>
          <DownOutlined style="font-weight: bold" />
        </span>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="logout">
              <a href="javascript:;">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<style lang="less" scoped>
.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.ant-dropdown-link {
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
}
</style>

<style>
.user-dropdown-menu {
  top: 69px !important;
}
</style>
