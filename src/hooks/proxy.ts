import { ComponentInternalInstance, getCurrentInstance } from "vue";

export default function useProxy() {
  const { proxy } = getCurrentInstance() as ComponentInternalInstance;
  return proxy;
}
