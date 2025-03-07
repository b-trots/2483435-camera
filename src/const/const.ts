import { Flip } from 'react-toastify';

enum DefaultParam {
  ProductImgWidth = 280,
  ProductImgHeight = 240,
  Button = 'button',
}

enum ServiceParam {
  SnowflackSize = 9,
  RateStarWidth = 17,
  RateStarHeight = 16,
  BascetIconWidth = 24,
  BascetIconHeight = 16,
  SocialIconSize = 20,
  UpButtonWidth = 12,
  UpButtonHeight = 18,
  ShownComments = 3,
  ShownCommentsStep = 3,
}

enum ServerParam {
  BaseURL = 'https://camera-shop.accelerator.htmlacademy.pro',
  TimeResponse = 5000,
}

const TabName = {
  Characteristics: 'Характеристики',
  Description: 'Описание',
};

enum ErrorMessage {
  PhoneInput = 'Допустимы только цифры, пробелы, скобки, тире и "+"',
  PhoneSubmit = 'Введите корректный номер телефона в формате +7(9XX)XXX-XX-XX',
}

const Validation = {
  PhoneInput: /^[\d\s()+-]*$/,
  PhoneSubmit: /^(\+7|7|8)?\s*\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
} as const;

enum TitleName {
  Void = '',
  StoreName = 'Фотошоп',
  Catalog = 'Каталог',
  Basket = 'Корзина',
  PageNotFound = 'Page Not Found',
}

enum LogoParam {
  Name = 'Переход на главную',
  Width = 100,
  Height = 36,
}

enum BemClass {
  Footer = 'footer',
  Header = 'header',
  Product = 'product',
  ProductCard = 'product-card',
  BasketItem = 'basket-item',
  ReviewCard = 'review-card',
  ProductTabs = 'product__tabs',
}

enum ProductParam {
  Article = 'Артикул',
  Category = 'Категория',
  Level = 'Уровень',
  Price = 'Цена',
  Rating = 'Рейтинг',
  ReviewCount = 'Всего оценок',
  Type = 'Тип камеры',
}

enum ExplanationWord {
  Phone = 'Телефон',
  EnterPhone = 'Введите ваш номер',
  HomePage = 'Home Page',
  Reviews = 'Отзывы',
  Grade = 'Оценка',
  Advantage = 'Достоинства',
  Disadvantage = 'Недостатки',
  Comment = 'Комментарий',
}

enum BemMode {
  Void = '',
  Mono = '-mono',
  Full = '-full',
  IsActive = 'is-active',
}

const SHOP_DESCRIPTION = 'Интернет-магазин фото- и видеотехники';
const SHOP_TITLE = 'Каталог фото- и видеотехники';

enum BannerParam {
  Width = 1280,
  Height = 280,
  Alt = 'баннер',
  Message = 'Новинка!',
}

enum SymbolParam {
  Dash = '-',
  DoubleUnderscore = '__',
}

enum NameSpace {
  FirstElement = 0
}

const CallItemParam = {
  Title: 'Свяжитесь со мной',
  ToastCloseTime: 3000,
  ToastLimitCount: 1,
  ToastTheme: 'colored',
  ToastTransition: Flip,
  ToastPosition: 'absolute',
  ToastTopDistance: '85px',
  ToastLeftDistance: '50%',
  ToastTransform: 'translateX(-50%)',
} as const;

const RATING_STAR_COUNT = 5;

const PICTURE_PARAMS = [
  {
    bemClass: BemClass.Product,
    imgWidth: 560,
    imgHeight: 480,
  },
  {
    bemClass: BemClass.ProductCard,
    imgWidth: 280,
    imgHeight: 240,
  },
  {
    bemClass: BemClass.BasketItem,
    imgWidth: 140,
    imgHeight: 120,
  },
] as const;

enum SliceName {
  Products = 'PRODUCTS',
  Product = 'PRODUCT',
  Active = 'ACTIVE',
  Reviews = 'REVIEWS',
  Modal = 'MODAL',
}

enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

enum ModalWindow {
  CallItem = 'callItem',
}

enum ModalStatus{
  Open = 'true',
  Close = 'false',
}

enum BooleanStatus {
  True = 'true',
  False = 'false',
}

export {
  TabName,
  ErrorMessage,
  Validation,
  TitleName,
  LogoParam,
  BemClass,
  BemMode,
  SHOP_DESCRIPTION,
  SHOP_TITLE,
  BannerParam,
  ProductParam,
  CallItemParam,
  RATING_STAR_COUNT,
  PICTURE_PARAMS,
  DefaultParam,
  ServiceParam,
  ExplanationWord,
  ServerParam,
  SymbolParam,
  SliceName,
  RequestStatus,
  NameSpace,
  ModalWindow,
  ModalStatus,
  BooleanStatus
};
