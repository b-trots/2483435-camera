import { StatusCodes } from 'http-status-codes';
import { Flip } from 'react-toastify';

const SHOP_DESCRIPTION = 'Интернет-магазин фото- и видеотехники';
const SHOP_TITLE = 'Каталог фото- и видеотехники';
const SHUTTER_FLAPS = [0, 1, 2, 3, 4, 5];
const FLAPS_COUNT = 6;

const DefaultParam = {
  ProductImgWidth: 280,
  ProductImgHeight: 240,
  Button: 'button',
  ScrollZero: 0,
  VoidArray: [],
  PageNumberZero: 0,
  PageNumberFirst:1
};

enum APIRoute {
  Products = '/cameras',
  Reviews = '/reviews',
  Orders = '/orders',
}

enum ServiceParam {
  SnowflakeSize = 9,
  RateStarWidth = 17,
  RateStarHeight = 16,
  BasketIconWidth = 24,
  BasketIconHeight = 16,
  SocialIconSize = 20,
  UpButtonWidth = 12,
  UpButtonHeight = 18,
  ShownComments = 3,
  ShownCommentsStep = 3,
  ItemsPerPage = 9,
  PaginationStep = 1,
}

enum ServerParam {
  BaseURL = 'https://camera-shop.accelerator.htmlacademy.pro',
  TimeResponse = 5000,
}

const TabName = {
  Characteristics: 'Характеристики',
  Description: 'Описание',
};

enum ErrorInfoMessage {
  PhoneInput = 'Допустимы только цифры, пробелы, скобки, тире и "+"',
  PhoneSubmit = 'Введите корректный номер телефона в формате +7(9XX)XXX-XX-XX',
  Error = 'Произошла ошибка:',
  TryLater = 'Попробуйте позже.',
  CheckInternet = 'Не удалось подключиться к серверу. Проверьте интернет-соединение.',
}

const Validation = {
  PhoneInput: /^[\d\s()+-]*$/,
  PhoneSubmit: /^(?:\+7|8)\s*\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
} as const;

enum TitleName {
  Void = '',
  StoreName = 'Фотошоп',
  Catalog = 'Каталог',
  Basket = 'Корзина',
  Page404 = 'Страница не найдена',
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
  PaginationLink = 'pagination__link',
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
  OrderSuccess = 'Заказ оформлен',
}

enum BemMode {
  Void = '',
  Mono = '-mono',
  Full = '-full',
  IsActive = 'is-active',
  Active = '--active',
}

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
  FirstElement = 0,
}

const ToastParam = {
  CloseTime: 3000,
  LimitCount: 1,
  Theme: 'colored',
  Transition: Flip,
  Position: 'absolute',
  TopDistance: '85px',
  LeftDistance: '50%',
  Transform: 'translateX(-50%)',
  Main: 'main',
  Modal: 'modal',
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
  Reviews = 'REVIEWS',
  Modal = 'MODAL',
  Order = 'ORDER',
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

enum ModalTitle {
  CallItem = 'Свяжитесь со мной',
}

enum ModalStatus {
  Open = 'true',
  Close = 'false',
}

const StatusCodeMapping: Record<number, string> = {
  [StatusCodes.BAD_REQUEST]: 'Некорректный запрос',
  [StatusCodes.UNAUTHORIZED]: 'Необходимо авторизоваться.',
  [StatusCodes.FORBIDDEN]: 'У вас недостаточно прав.',
  [StatusCodes.NOT_FOUND]: 'Вы обращаетесь к несуществующему ресурсу.',
  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Внутренняя ошибка сервера.',
  [StatusCodes.SERVICE_UNAVAILABLE]: 'Сервис временно недоступен.',
} as const;

enum ApiActionName {
  FetchProducts = 'PRODUCTS/fetchProducts',
  FetchProduct = 'PRODUCTS/fetchOrSetProduct',
  FetchReviews = 'REVIEWS/fetchOrSetReviews',
  FetchOrder = 'ORDER/fetchOrder',
}

enum Coupon {
  Three = 'camera-333',
  Four = 'camera-444',
  Default = 'camera',
}

enum CSSClass {
  LoadMessage = 'loading-message',
  ErrorMessage = 'error-message',
}

export {
  TabName,
  ErrorInfoMessage,
  Validation,
  TitleName,
  LogoParam,
  BemClass,
  BemMode,
  SHOP_DESCRIPTION,
  SHOP_TITLE,
  BannerParam,
  ProductParam,
  ToastParam,
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
  StatusCodeMapping,
  ModalTitle,
  SHUTTER_FLAPS,
  FLAPS_COUNT,
  APIRoute,
  ApiActionName,
  Coupon,
  CSSClass,
};
