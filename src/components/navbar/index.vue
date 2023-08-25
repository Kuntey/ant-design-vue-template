<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img
          alt="logo"
          src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
        />
        <a-typography-title
          :style="{ margin: 0, fontSize: '18px' }"
          :heading="5"
        >
          Arco Pro
        </a-typography-title>
        <MenuFoldOutlined
          v-if="!topMenu && appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>
    <div class="center-side">
      <Menu v-if="topMenu" />
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip :title="$t('settings.search')">
          <a-button class="nav-btn" type="outline" :shape="'circle'">
            <template #icon>
              <SearchOutlined />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :title="$t('settings.language')">
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="setDropDownVisible"
          >
            <template #icon>
              <TranslationOutlined />
            </template>
          </a-button>
        </a-tooltip>
        <a-dropdown trigger="click">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="item in locales"
                :key="item.value"
                :value="item.value"
                @click="changeLocale(item.value)"
              >
                <template #icon>
                  <CheckOutlined v-show="item.value === currentLocale" />
                </template>
                {{ item.label }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </li>
      <li>
        <a-tooltip
          :title="
            theme === 'light'
              ? $t('settings.navbar.theme.toDark')
              : $t('settings.navbar.theme.toLight')
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="handleToggleTheme"
          >
            <template #icon>
              <EyeInvisibleOutlined v-if="theme === 'dark'" />
              <EyeOutlined v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :title="$t('settings.navbar.alerts')">
          <div class="message-box-trigger">
            <a-badge :count="9" dot>
              <a-button
                class="nav-btn"
                type="outline"
                :shape="'circle'"
                @click="setPopoverVisible"
              >
                <BellOutlined />
              </a-button>
            </a-badge>
          </div>
        </a-tooltip>
        <a-popover
          trigger="click"
          :arrow-style="{ display: 'none' }"
          :content-style="{ padding: 0, minWidth: '400px' }"
          content-class="message-popover"
        >
          <div ref="refBtn" class="ref-btn"></div>
          <template #content>
            <message-box />
          </template>
        </a-popover>
      </li>
      <li>
        <a-tooltip
          :title="
            isFullscreen
              ? $t('settings.navbar.screen.toExit')
              : $t('settings.navbar.screen.toFull')
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="toggleFullScreen"
          >
            <template #icon>
              <FullscreenExitOutlined v-if="isFullscreen" />
              <FullscreenOutlined v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :title="$t('settings.title')">
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="setVisible"
          >
            <template #icon>
              <SettingOutlined />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar
            :size="32"
            :style="{ marginRight: '8px', cursor: 'pointer' }"
          >
            <img alt="avatar" :src="avatar" />
          </a-avatar>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a-space @click="switchRoles">
                  <TagOutlined />
                  <span>
                    {{ $t("messageBox.switchRoles") }}
                  </span>
                </a-space>
              </a-menu-item>
              <a-menu-item>
                <a-space @click="$router.push({ name: 'Info' })">
                  <UserOutlined />
                  <span>
                    {{ $t("messageBox.userCenter") }}
                  </span>
                </a-space>
              </a-menu-item>
              <a-menu-item>
                <a-space @click="$router.push({ name: 'Setting' })">
                  <SettingOutlined />
                  <span>
                    {{ $t("messageBox.userSettings") }}
                  </span>
                </a-space>
              </a-menu-item>
              <a-menu-item>
                <a-space @click="handleLogout">
                  <ExportOutlined />
                  <span>
                    {{ $t("messageBox.logout") }}
                  </span>
                </a-space>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { message } from "ant-design-vue";
import { useDark, useToggle, useFullscreen } from "@vueuse/core";
import { useAppStore, useUserStore } from "@/store";
import { LOCALE_OPTIONS } from "@/locale";
import useLocale from "@/hooks/locale";
import useUser from "@/hooks/user";
import Menu from "@/components/menu/index.vue";
import MessageBox from "../message-box/index.vue";

const appStore = useAppStore();
const userStore = useUserStore();
const { logout } = useUser();
const { changeLocale, currentLocale } = useLocale();
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
const locales = [...LOCALE_OPTIONS];
const avatar = computed(() => {
  return userStore.avatar;
});
const theme = computed(() => {
  return appStore.theme;
});
const topMenu = computed(() => appStore.topMenu && appStore.menu);
const isDark = useDark({
  selector: "body",
  attribute: "theme",
  valueDark: "dark",
  valueLight: "light",
  storageKey: "theme",
  onChanged(dark: boolean) {
    // overridden default behavior
    appStore.toggleTheme(dark);
  },
});
const toggleTheme = useToggle(isDark);
const handleToggleTheme = () => {
  toggleTheme();
};
const setVisible = () => {
  appStore.updateSettings({ globalSettings: true });
};
const refBtn = ref();
const triggerBtn = ref();
const setPopoverVisible = () => {
  const event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  refBtn.value.dispatchEvent(event);
};
const handleLogout = () => {
  logout();
};
const setDropDownVisible = () => {
  const event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  triggerBtn.value.dispatchEvent(event);
};
const switchRoles = async () => {
  const res = await userStore.switchRoles();
  message.success(res as string);
};
const toggleDrawerMenu = inject("toggleDrawerMenu") as () => void;
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;
  margin-top: 1em;

  :deep(.locale-select) {
    border-radius: 20px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }

  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }

  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }

  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
