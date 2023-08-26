import * as components from "@ant-design/icons-vue";

export default {
  install: (app: { component: (arg0: string, arg1: any) => void }) => {
    for (const key in components) {
      // @ts-ignore
      const componentConfig = components[key];
      app.component(key, componentConfig);
    }
  },
};
