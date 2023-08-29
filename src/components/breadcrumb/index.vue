<template>
  <a-breadcrumb class="container-breadcrumb">
    <a-breadcrumb-item>
      <AppstoreOutlined />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in items" :key="item">
      {{ t(item) }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  items: {
    type: Array as PropType<string[]>,
    default() {
      return [];
    },
  },
});
</script>

<style scoped lang="less">
.container-breadcrumb {
  margin: 16px 0;

  :deep(.@{ant-prefix}-breadcrumb-item) {
    color: rgb(var(--gray-6));

    &:last-child {
      color: rgb(var(--gray-8));
    }
  }
}
</style>
