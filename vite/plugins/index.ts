import vue from "@vitejs/plugin-vue";

import createAutoImport from "./auto-import";
import createUnocss from "./unocss";
// import createCompression from './compression'
import createVueComponents from "./vue-components";

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue(), createUnocss()];
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createVueComponents());
  // isBuild && vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins;
}
