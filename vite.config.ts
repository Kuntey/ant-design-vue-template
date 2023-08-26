import { defineConfig, loadEnv } from "vite";
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import mkcert from "vite-plugin-mkcert";
import createVitePlugins from "./vite/plugins";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    base:
      process.env.NODE_ENV === "production"
        ? process.env.FX_CDN_PUBLIC_PATH
        : "/",
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        "~": path.resolve(__dirname, "./"),
        // 设置别名
        "@": path.resolve(__dirname, "./src"),
        vue: "vue/dist/vue.esm-bundler.js",
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
        },
      },
    },
    experimental: {
      renderBuiltUrl(filename, type) {
        return {
          relative: true,
        };
      },
    },

    server: {
      https: true,
      host: "0.0.0.0",
    },

    plugins: [vueJsx(), mkcert(), createVitePlugins(env, command === "build")],
  };
});
