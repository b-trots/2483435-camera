import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Cameras } from '../types/camera-type';
import {
  DefaultParam,
  NameSpace,
  ServiceParam,
  Validation,
} from '../const/const';

const toStandardizePhone = (phone: string) =>
  phone.replace(/\D/g, '').replace(/^8/, '7').replace(/^7/, '+7');

const reviewDate = (date: string) => {
  dayjs.locale(ServiceParam.LocaleRuAbbreviated);
  return dayjs(date).format(ServiceParam.DateFormat);
};

const selectCameras = (
  cameras: Cameras,
  currentPage: string,
  quantity: number
) => {
  const startIndex =
    (Number(currentPage) - ServiceParam.PaginationStep) * quantity;
  const endIndex = startIndex + quantity;

  const currentCameras = cameras.slice(startIndex, endIndex);
  return currentCameras;
};

const countPages = (cameras: unknown[], quantity: number) =>
  Math.ceil(cameras.length / quantity);

function formatPrice(price: number): string {
  const correctPrice = new Intl.NumberFormat(ServiceParam.LocaleRuFull).format(
    price
  );
  return `${correctPrice} ${NameSpace.RuRubleSymbol}`;
}

const correctPrice = (value: string | number) =>
  String(value).replace(Validation.CameraPrice, DefaultParam.EmptyString);

const capitalize = <T extends string>(letter: T): Capitalize<T> | string =>
  letter
    ? ((letter.charAt(ServiceParam.FirstChar).toUpperCase() +
        letter.slice(ServiceParam.SecondChar)) as Capitalize<T>)
    : letter;

export {
  toStandardizePhone,
  reviewDate,
  selectCameras,
  countPages,
  formatPrice,
  correctPrice,
  capitalize,
};
