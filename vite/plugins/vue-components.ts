import components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default function createAutoImport() {
  return components({
    resolvers: [
      AntDesignVueResolver({
        resolveIcons: true,
        importStyle: false, // css in js
      }),
    ],
    dts: true,
  });
}
