import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { AdaptedCameraCategory, Cameras } from '@/types/camera-type';
import {
  DefaultParam,
  NameSpace,
  ServiceParam,
  Validation,
} from '@/const/const';
import {
  CameraCategory,
  CameraLevel,
  CameraParam,
  CameraType,
} from '@/const/camera-const';

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

const lowerize = <T extends string>(letter: T): Capitalize<T> | string =>
  letter
    ? ((letter.charAt(ServiceParam.FirstChar).toLowerCase() +
        letter.slice(ServiceParam.SecondChar)) as Capitalize<T>)
    : letter;

const categoryNameAdapter = (category: CameraCategory) =>
  category === CameraCategory.PhotoCamera ? CameraParam.Photo : category;

const correctCategory = (category: AdaptedCameraCategory, type: CameraType) =>
  `${type} ${lowerize(category)}`;

const correctLevel = (level: CameraLevel) =>
  `${level} ${lowerize(CameraParam.Level)}`;

const correctName = (category: AdaptedCameraCategory, cameraName: string) => {
  if (cameraName.includes(CameraParam.Retro)) {
    const correctedName = cameraName.replace(CameraParam.Retro,DefaultParam.EmptyString).trim();
    return `${CameraParam.Retro} «${correctedName}»`;
  } else {
    return `${category} «${cameraName}»`;
  }
};

export {
  toStandardizePhone,
  reviewDate,
  selectCameras,
  countPages,
  formatPrice,
  correctPrice,
  capitalize,
  lowerize,
  correctCategory,
  correctLevel,
  correctName,
  categoryNameAdapter,
};
