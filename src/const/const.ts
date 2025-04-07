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
  EmptyArray: [],
  EmptyString: '',
  EmptyObject: {},
  PageNumberZero: 0,
  PageNumberOne: 1,
  ZeroValue: 0,
  ZeroIndex: 0,
  UrlId: 'page',
};

enum APIRoute {
  Cameras = '/cameras',
  Reviews = '/reviews',
  Orders = '/orders',
  Promo = '/promo',
  Similar = '/similar',
}

enum ServiceParam {
  BannerItems = 3,
  SearchIconSize = 16,
  BasketIconHeight = 16,
  BasketIconWidth = 24,
  ChangeSlideSpeed = 1000,
  ItemsPerPage = 9,
  ItemsPerSlide = 3,
  PaginationStep = 1,
  RateStarHeight = 16,
  RateStarWidth = 17,
  ReviewsScrollThreshold = '-160px',
  ShownComments = 3,
  ShownCommentsStep = 3,
  SliderArrowHeight = 12,
  SliderArrowWidth = 7,
  SnowflakeSize = 9,
  SocialIconSize = 20,
  SimilarSlideBetween = 0,
  SwiperSlideTime = 3000,
  UpButtonHeight = 18,
  UpButtonWidth = 12,
  RequestReturnTimer = 5000,
  CardsPerSlide = 3,
  ArrowIconHeight = 8,
  ArrowIconWidth = 5,
  WindowScrollYZero = 0,
  MinSearchCharacters = 3,
  SortIconWidth = 16,
  SortIconHeight = 14,
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
  FormSearch = 'form-search',
  ListOpened = 'list-opened',
  FormSearchSelectItem = 'form-search__select-item',
  FormSearchSelectItemActive = 'form-search__select-item--active',
}

enum CameraParam {
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
  SimilarProducts = 'Похожие товары',
  SearchTheSite = 'Поиск по сайту',
  ToSort = 'Сортировать: '
}

enum BemMode {
  Void = '',
  Mono = '-mono',
  Full = '-full',
  IsActive = 'is-active',
  Active = '--active',
  Prev = '--prev',
  Next = '--next',
}

enum BannerParam {
  Width = 1280,
  Height = 280,
  Alt = 'баннер',
  Message = 'Новинка!',
  Text = 'Профессиональная камера от известного производителя',
}

enum SymbolParam {
  Dash = ' - ',
  DoubleUnderscore = '__',
}

enum NameSpace {
  FirstElement = 0,
  FirstPage = 1,
  SimilarPageSearchId = 'similarPage',
  CatalogPageSearchId = 'page',
  AriaLabel = 'aria-label',
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
  Cameras = 'CAMERAS',
  Reviews = 'REVIEWS',
  Modal = 'MODAL',
  Order = 'ORDER',
  Active = 'ACTIVE',
}

enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

enum ModalType {
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
  FetchCameras = 'CAMERAS/fetchCameras',
  FetchCamera = 'CAMERAS/fetchOrSetCamera',
  FetchPromo = 'CAMERAS/fetchPromo',
  FetchSimilar = 'CAMERAS/fetchSimilar',
  FetchReviews = 'REVIEWS/fetchOrSetReviews',
  FetchOrder = 'ORDER/fetchOrder',
  UpdateAllSetCurrentId = 'UpdateAllCamerasAndSetCurrentCameraId',
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

enum RequestCategory {
  Cameras = 'cameras',
  Camera = 'camera',
  Reviews = 'reviews',
}

enum Sorting {
  SortPrice = 'sortPrice',
  SortPopular = 'sortPopular',
  Up = 'up',
  Down = 'down',
  Sort = 'sort',
  SortIcon = 'sort-icon',
  SortType = 'catalog-sort__type',
  SortOrder = 'catalog-sort__order',
}

const SORTING = {
  type: [
    { name: Sorting.Sort, id: Sorting.SortPrice, text: 'по цене' },
    {
      name: Sorting.Sort,
      id: Sorting.SortPopular,
      text: 'по популярности',
    },
  ],
  direction: [
    {
      name: Sorting.SortIcon,
      id: Sorting.Up,
      text: 'По возрастанию',
    },
    {
      name: Sorting.SortIcon,
      id: Sorting.Down,
      text: 'По убыванию',
    },
  ],
} as const;

export {
  ApiActionName,
  APIRoute,
  BannerParam,
  BemClass,
  BemMode,
  CameraParam,
  Coupon,
  CSSClass,
  DefaultParam,
  ErrorInfoMessage,
  ExplanationWord,
  FLAPS_COUNT,
  LogoParam,
  ModalStatus,
  ModalTitle,
  ModalType,
  NameSpace,
  PICTURE_PARAMS,
  RATING_STAR_COUNT,
  RequestCategory,
  RequestStatus,
  ServerParam,
  ServiceParam,
  SHOP_DESCRIPTION,
  SHOP_TITLE,
  SHUTTER_FLAPS,
  SliceName,
  StatusCodeMapping,
  SymbolParam,
  TabName,
  TitleName,
  ToastParam,
  Validation,
  Sorting,
  SORTING,
};
