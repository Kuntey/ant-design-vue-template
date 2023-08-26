import vue from "@vitejs/plugin-vue";

import createAutoImport from "./auto-import";
import createUnocss from "./unocss";
import createCompression from "./compression";
import createVueComponents from "./vue-components";
import createVueI18n from "./vue-il8n";

export default function createVitePlugins(viteEnv: any, isBuild = false) {
  const vitePlugins = [vue(), createUnocss()];
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createVueComponents());
  vitePlugins.push(createVueI18n());
  // eslint-disable-next-line no-unused-expressions
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
}
