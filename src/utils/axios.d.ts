// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
import { HttpResponse } from './axiosInterceptor';

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<HttpResponse>;
    interceptors: {
      request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
      response: AxiosInterceptorManager<AxiosResponse<HttpResponse>>;
    };
  }
}
