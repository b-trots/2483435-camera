import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ReviewType } from '../types/types';
import { ProductsForStore } from '../types/product-type';
import { PaginationButton } from '../const/const-button';
import { ServiceParam } from '../const/const';

const toStandardizePhone = (phone: string) =>
  phone.replace(/\D/g, '').replace(/^8/, '7').replace(/^7/, '+7');

const reviewDate = (date: string) => {
  dayjs.locale('ru');
  return dayjs(date).format('DD MMMM');
};
const daySort = (reviewA: ReviewType, reviewB: ReviewType) =>
  dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));

const selectProducts = (products: ProductsForStore, currentPage: number, quantity:number) => {
  const startIndex = (currentPage - ServiceParam.PaginationStep) * quantity;
  const endIndex = startIndex + quantity;

  const currentProducts = Object.values(products).slice(
    startIndex,
    endIndex
  );

  return currentProducts;
};

const countPages = (products: unknown[], quantity:number) =>
  Math.ceil(products.length / quantity);

const createPagesNames = (pagesCount: number) => [
  ...Array.from({ length: pagesCount }, (_, i) => String(i + 1)),
  PaginationButton.Text,
];

export {
  toStandardizePhone,
  reviewDate,
  daySort,
  selectProducts,
  countPages,
  createPagesNames,
};
