import axios, { AxiosError, AxiosInstance } from 'axios';
import { ServerParam } from '@/const/const';
import { DetailMessageType, handleError } from '@/utils/error-utils';

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: ServerParam.BaseURL as string,
    timeout: ServerParam.TimeResponse as number,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      handleError(error);
      throw error;
    }
  );

  return api;
};

export { createAPI };
