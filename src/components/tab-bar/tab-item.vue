<template>
  <a-dropdown :trigger="['contextmenu']" @select="actionSelect">
    <a-checkable-tag
      :bordered="false"
      :class="{
        'link-activated': itemData.fullPath === $route.fullPath,
        'ant-tag-borderless': true,
      }"
      :checked="itemData.fullPath === $route.fullPath"
      @click="goto(itemData)"
    >
      <span class="tag-link">
        {{ t(itemData.title) }}
      </span>
      <span
        class="anticon anticon-close ant-tag-close-icon ant-tag-close-btn"
        @click.stop="tagClose(itemData, index)"
      >
        <CloseOutlined />
      </span>
    </a-checkable-tag>
    <!-- <a-tag :bordered="false" closable class="{ 'link-activated': itemData.fullPath === $route.fullPath }"
            @close="tagClose(itemData, index)" @click="goto(itemData)">
            {{ t(itemData.title) }}
        </a-tag> -->
    <!-- <span class="ant-tag ant-tag-size-medium ant-tag-checked"
            :class="{ 'link-activated': itemData.fullPath === $route.fullPath }" @click="goto(itemData)">
            <span class="tag-link">
                {{ t(itemData.title) }}
            </span>
            <span class="ant-icon-hover ant-tag-icon-hover ant-icon-hover-size-medium ant-tag-close-btn"
                @click.stop="tagClose(itemData, index)">
                <CloseOutlined />
            </span>
        </span> -->
    <template #overlay>
      <a-menu>
        <a-menu-item
          :disabled="disabledReload"
          @click="actionSelect(Eaction.reload)"
        >
          <ReloadOutlined />
          <span>重新加载</span>
        </a-menu-item>
        <a-menu-item
          class="sperate-line"
          :disabled="disabledCurrent"
          @click="actionSelect(Eaction.reload)"
        >
          <CloseOutlined />
          <span>关闭当前标签页</span>
        </a-menu-item>
        <a-menu-item
          :disabled="disabledLeft"
          @click="actionSelect(Eaction.reload)"
        >
          <VerticalRightOutlined />
          <span>关闭左侧标签页</span>
        </a-menu-item>
        <a-menu-item
          class="sperate-line"
          :disabled="disabledRight"
          @click="actionSelect(Eaction.reload)"
        >
          <VerticalLeftOutlined />
          <span>关闭右侧标签页</span>
        </a-menu-item>
        <a-menu-item @click="actionSelect(Eaction.reload)">
          <SwapOutlined />
          <span>关闭其它标签页</span>
        </a-menu-item>
        <a-menu-item @click="actionSelect(Eaction.reload)">
          <CloseOutlined />
          <span>关闭全部标签页</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTabBarStore } from "@/store";
import type { TagProps } from "@/store/modules/tab-bar/types";
import { DEFAULT_ROUTE_NAME, REDIRECT_ROUTE_NAME } from "@/router/constants";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// eslint-disable-next-line no-shadow
enum Eaction {
  reload = "reload",
  current = "current",
  left = "left",
  right = "right",
  others = "others",
  all = "all",
}

const props = defineProps({
  itemData: {
    type: Object as PropType<TagProps>,
    default() {
      return [];
    },
  },
  index: {
    type: Number,
    default: 0,
  },
});

const router = useRouter();
const route = useRoute();
const tabBarStore = useTabBarStore();

const goto = (tag: TagProps) => {
  router.push({ ...tag });
};
const tagList = computed(() => {
  return tabBarStore.getTabList;
});

const disabledReload = computed(() => {
  return props.itemData.fullPath !== route.fullPath;
});

const disabledCurrent = computed(() => {
  return props.index === 0;
});

const disabledLeft = computed(() => {
  return [0, 1].includes(props.index);
});

const disabledRight = computed(() => {
  return props.index === tagList.value.length - 1;
});

const tagClose = (tag: TagProps, idx: number) => {
  tabBarStore.deleteTag(idx, tag);
  if (props.itemData.fullPath === route.fullPath) {
    const latest = tagList.value[idx - 1]; // 获取队列的前一个tab
    router.push({ name: latest.name });
  }
};

const findCurrentRouteIndex = () => {
  return tagList.value.findIndex((el) => el.fullPath === route.fullPath);
};
const actionSelect = async (value: any) => {
  const { itemData, index } = props;
  const copyTagList = [...tagList.value];
  if (value === Eaction.current) {
    tagClose(itemData, index);
  } else if (value === Eaction.left) {
    const currentRouteIdx = findCurrentRouteIndex();
    copyTagList.splice(1, props.index - 1);

    tabBarStore.freshTabList(copyTagList);
    if (currentRouteIdx < index) {
      router.push({ name: itemData.name });
    }
  } else if (value === Eaction.right) {
    const currentRouteIdx = findCurrentRouteIndex();
    copyTagList.splice(props.index + 1);

    tabBarStore.freshTabList(copyTagList);
    if (currentRouteIdx > index) {
      router.push({ name: itemData.name });
    }
  } else if (value === Eaction.others) {
    const filterList = tagList.value.filter((_el, idx) => {
      return idx === 0 || idx === props.index;
    });
    tabBarStore.freshTabList(filterList);
    router.push({ name: itemData.name });
  } else if (value === Eaction.reload) {
    tabBarStore.deleteCache(itemData);
    await router.push({
      name: REDIRECT_ROUTE_NAME,
      params: {
        path: route.fullPath,
      },
    });
    tabBarStore.addCache(itemData.name);
  } else {
    tabBarStore.resetTabList();
    router.push({ name: DEFAULT_ROUTE_NAME });
  }
};
</script>

<style scoped lang="less">
.@{ant-prefix}-tag-borderless {
  border-color: transparent;
  background: rgba(0, 0, 0, 0.04);
}

.tag-link {
  color: var(--color-text-2);
  text-decoration: none;
}

.link-activated {
  color: rgb(var(--link-6));

  .tag-link {
    color: rgb(var(--link-6));
  }

  & > .@{ant-prefix}-tag-close-btn {
    color: rgb(var(--link-6));
  }
}

:deep(.@{ant-prefix}-dropdown-option-content) {
  span {
    margin-left: 10px;
  }
}

.@{ant-prefix}-dropdown-open {
  .tag-link {
    color: rgb(var(--danger-6));
  }

  .@{ant-prefix}-tag-close-btn {
    color: rgb(var(--danger-6));
  }
}

.sperate-line {
  border-bottom: 1px solid var(--color-neutral-3);
}
</style>
