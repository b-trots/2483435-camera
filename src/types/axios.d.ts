import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    suppressErrorNotify?: boolean;
  }
}
