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

const selectProducts = (allProducts: ProductsForStore, currentPage: number) => {
  const startIndex = (currentPage - 1) * ServiceParam.ItemsPerPage;
  const endIndex = startIndex + ServiceParam.ItemsPerPage;

  const currentProducts = Object.values(allProducts).slice(
    startIndex,
    endIndex
  );

  return currentProducts;
};

const countPages = (products: ProductsForStore) =>
  Math.ceil(Object.keys(products).length / ServiceParam.ItemsPerPage);

const createPagesNames = (pagesCount: number) => [
  ...Array.from({ length: pagesCount }, (_, i) => String(i + 1)),
  PaginationButton.Text,
];

const getRandomElements = <T>(array: T[], count: number): T[] => {
  const result: T[] = [];
  const arrayCopy = [...array];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    result.push(arrayCopy.splice(randomIndex, 1)[0]);
  }

  return result;
};

export {
  toStandardizePhone,
  reviewDate,
  daySort,
  selectProducts,
  countPages,
  createPagesNames,
  getRandomElements,
};
