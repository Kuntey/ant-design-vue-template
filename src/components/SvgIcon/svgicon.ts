import * as components from "@ant-design/icons-vue";

export default {
  install: (app) => {
    for (const key in components) {
      const componentConfig = components[key];
      app.component(key, componentConfig);
    }
  },
};
