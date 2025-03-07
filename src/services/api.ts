import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { ServerParam } from '../const/const';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

type DetailErrorType = {
  type: string;
  message: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: ServerParam.BaseURL as string,
    timeout: ServerParam.TimeResponse as number,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailErrorType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;

        toast.error(detailMessage.message);
      }

      throw error;
    }
  );
  return api;
};

export { createAPI, shouldDisplayError };
