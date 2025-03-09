import { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { ErrorMessage, StatusCodeMapping, ToastParam } from '../const/const';

export type DetailMessageType = {
  type: string;
  message: string;
};

const errorNotify = (message: string) =>
  toast.error(message, {
    autoClose: ToastParam.CloseTime,
    hideProgressBar: true,
    pauseOnFocusLoss: false,
    draggable: true,
    pauseOnHover: false,
  });

const phoneValidationError = (message: string) =>
  toast.error(message, {
    autoClose: ToastParam.CloseTime,
    hideProgressBar: true,
    pauseOnFocusLoss: false,
    draggable: true,
    pauseOnHover: false,
    theme: ToastParam.Theme,
    transition: ToastParam.Transition,
  });

const handleError = (error: AxiosError<DetailMessageType>) => {
  const { response, message } = error;
  const request = error.request as AxiosRequestConfig;
  if (response) {
    const { status, data } = response;
    const errorMessage = StatusCodeMapping[status]
      ? `${StatusCodeMapping[status]} ${data?.message || ''}`.trim()
      : `${ErrorMessage.Error} ${status}. ${ErrorMessage.TryLater}`;

    errorNotify(errorMessage);
  } else if (request) {
    errorNotify(ErrorMessage.CheckInternet);
  } else {
    errorNotify(`${ErrorMessage.Error} ${message}`);
  }
};

export { errorNotify, phoneValidationError, handleError };
