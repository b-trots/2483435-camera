import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Cameras } from '../types/camera-type';
import { PaginationButton } from '../const/const-button';
import { DefaultParam, ServiceParam, Validation } from '../const/const';

const toStandardizePhone = (phone: string) =>
  phone.replace(/\D/g, '').replace(/^8/, '7').replace(/^7/, '+7');

const reviewDate = (date: string) => {
  dayjs.locale('ru');
  return dayjs(date).format(ServiceParam.DateFormat);
};

const selectCameras = (
  cameras: Cameras,
  currentPage: number,
  quantity: number
) => {
  const startIndex = (currentPage - ServiceParam.PaginationStep) * quantity;
  const endIndex = startIndex + quantity;

  const currentCameras = Object.values(cameras).slice(startIndex, endIndex);

  return currentCameras;
};

const countPages = (products: unknown[], quantity: number) =>
  Math.ceil(products.length / quantity);

const createPagesNames = (pagesCount: number) => [
  ...Array.from({ length: pagesCount }, (_, i) =>
    String(i + ServiceParam.PageStep)
  ),
  PaginationButton.Text,
];

function formatPrice(price: number): string {
  const correctPrice = new Intl.NumberFormat('ru-RU').format(price);
  return `${correctPrice} ₽`;
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
  createPagesNames,
  formatPrice,
  correctPrice,
  capitalize,
};
