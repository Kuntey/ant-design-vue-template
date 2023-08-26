import axios from "axios";
import type { AxiosHeaders } from "axios";
import { message } from "ant-design-vue";
// import { useUserStore } from '@/store';
import { getToken } from "@/utils/auth";
import { tansParams } from "@/utils";

export interface HttpResponse<T = any> {
  msg: string;
  code: number;
  data?: T;
  list?: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {} as AxiosHeaders;
      }
      config.headers.token = `${token}`;
      //   config.headers.Authorization = `Bearer ${token}`;
    }
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = `${config.url}?${tansParams(config.params)}`;
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  },
);
// add response interceptors
axios.interceptors.response.use(
  // @ts-ignore
  (response) => {
    const res = response.data;
    /**
     * 暂定
     */
    const { code } = res;
    if ([0, 1].includes(code)) {
      return Promise.resolve(res);
    }
    if ([107].includes(res.code) && response.config.url !== "/api/user/info") {
      //   Modal.error({
      //     title: 'Confirm logout',
      //     content:
      //       'You have been logged out, you can cancel to stay on this page, or log in again',
      //     okText: 'Re-Login',
      //     async onOk() {
      //       const userStore = useUserStore();

      //       await userStore.logout();
      //       window.location.reload();
      //     },
      //   });
      //   const userStore = useUserStore();
      //   userStore.logout();
      //   window.location.reload();
      return Promise.reject(new Error(res.msg || "Error"));
    }
    return res;
  },
  (error) => {
    message.error({
      content: error.msg || "Request Error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);
