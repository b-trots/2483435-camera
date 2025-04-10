import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Cameras } from '../types/product-type';
import { PaginationButton } from '../const/const-button';
import { ServiceParam } from '../const/const';

const toStandardizePhone = (phone: string) =>
  phone.replace(/\D/g, '').replace(/^8/, '7').replace(/^7/, '+7');

const reviewDate = (date: string) => {
  dayjs.locale('ru');
  return dayjs(date).format('DD MMMM');
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
  ...Array.from({ length: pagesCount }, (_, i) => String(i + 1)),
  PaginationButton.Text,
];

function formatPrice(price: number): string {
  const correctPrice = new Intl.NumberFormat('ru-RU').format(price);
  return `${correctPrice} ₽`;
}

export {
  toStandardizePhone,
  reviewDate,
  selectCameras,
  countPages,
  createPagesNames,
  formatPrice,
};
