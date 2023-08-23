<script lang="ts" setup>
const selectedKeys1 = ref<string[]>(["2"]);
</script>

<template>
  <div class="logo" />
  <a-menu
    v-model:selectedKeys="selectedKeys1"
    theme="dark"
    mode="horizontal"
    :style="{ lineHeight: '64px' }"
  >
    <a-menu-item key="1">nav 1</a-menu-item>
    <a-menu-item key="2">nav 2</a-menu-item>
    <a-menu-item key="3">nav 3</a-menu-item>
  </a-menu>
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
</style>
