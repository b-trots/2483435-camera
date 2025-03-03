import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ReviewType } from '../types/types';

const toStandardizePhone = (phone: string) =>
  phone.replace(/\D/g, '').replace(/^8/, '7').replace(/^7/, '+7');

const reviewDate = (date: string) => {
  dayjs.locale('ru');
  return dayjs(date).format('DD MMMM');
};
const daySort = (reviewA: ReviewType, reviewB: ReviewType) =>
  dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));

export { toStandardizePhone, reviewDate, daySort };
