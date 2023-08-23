import type { FunctionalComponent } from "vue";

import "ant-design-vue/es/drawer/style";
import { Drawer } from "ant-design-vue";

import SiderMenu, {
  siderMenuProps,
  defaultRenderLogoAndTitle,
  type SiderMenuProps,
  type PrivateSiderMenuProps,
} from "./SiderMenu";

export { default as BaseMenu } from "./BaseMenu";

export type SiderMenuWrapperProps = Partial<SiderMenuProps> &
  Partial<PrivateSiderMenuProps>;

const SiderMenuWrapper: FunctionalComponent<SiderMenuWrapperProps> = (
  props,
  { attrs }
) => {
  return <SiderMenu {...attrs} {...props} />;
};

SiderMenuWrapper.inheritAttrs = false;
SiderMenuWrapper.displayName = "SiderMenuWrapper";

export {
  SiderMenu,
  // vue props
  siderMenuProps,
  defaultRenderLogoAndTitle,
};

export default SiderMenuWrapper;
