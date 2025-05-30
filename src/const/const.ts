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
  EmptyString: '',
  PageNumberZero: 0,
  PageNumberOne: 1,
  ZeroValue: 0,
  ZeroIndex: 0,
  Unit: 1,
};

enum SearchParam {
  Page = 'page',
  Info = 'info',
}

enum APIRoute {
  Cameras = '/cameras',
  Reviews = '/reviews',
  Orders = '/orders',
  Promo = '/promo',
  Similar = '/similar',
  Coupons = '/coupons',
}

const ServiceParam = {
  ModalIconWidth: 86,
  ModalIconHeight: 80,
  BannerItems: 3,
  SearchIconSize: 16,
  BasketIconHeight: 16,
  BasketIconSmallWidth: 16,
  BasketIconWidth: 24,
  ChangeSlideSpeed: 1000,
  CamerasPerPage: 9,
  PaginationStep: 1,
  RateStarHeight: 16,
  RateStarWidth: 17,
  ReviewsScrollThreshold: '-160px',
  ShownComments: 3,
  ShownCommentsStep: 3,
  SliderArrowHeight: 12,
  SliderArrowWidth: 7,
  SnowflakeSize: 9,
  SocialIconSize: 20,
  SimilarSlideBetween: 0,
  SwiperSlideTime: 3000,
  UpButtonHeight: 18,
  UpButtonWidth: 12,
  RequestTimeout: 1500,
  CardsPerSlide: 3,
  ArrowIconHeight: 8,
  ArrowIconWidth: 5,
  WindowScrollYZero: 0,
  MinimalSearchCharacters: 3,
  SortIconWidth: 16,
  SortIconHeight: 14,
  FirstElement: 0,
  SecondElement: 1,
  TabValueInActive: -1,
  TabValueZero: 0,
  RadixTen: 10,
  ScrollBehaviorSmooth: 'smooth',
  ScrollBlockNearest: 'nearest',
  ZeroValue: 0,
  MinimalCountCameras: 2,
  NegativeIndex: -1,
  IndexStep: 1,
  FirstChar: 0,
  SecondChar: 1,
  DateFormat: 'DD MMMM',
  PageStep: 1,
  LocaleRuFull: 'ru-RU',
  LocaleRuAbbreviated: 'ru',
  PaginationButtonsPack: 3,
  ZeroIndex: 0,
  LastNumberPageInPack: 3,
  DoublePaginationStep: 2,
  MinimalPagesCount: 1,
  QuantityButtonWidth: 7,
  QuantityButtonHeight: 12,
  MinQuantity: 1,
  MaxQuantity: 9,
  QuantityStep: 1,
  ReviewModalIconWidth: 80,
  ReviewModalIconHeight: 78,
  CommentMinLength: 5,
  ReviewNameMinSymbols: 2,
  ReviewNameMaxSymbols: 15,
  ReviewFieldMinSymbols: 10,
  ReviewFieldMaxSymbols: 160,
  minimumFractionDigits:2,
  maximumFractionDigits:2,
  RoundingValueOfNumber: 2,
  ReviewCountStep:1,
} as const;

enum ServerParam {
  BaseURL = 'https://camera-shop.accelerator.htmlacademy.pro',
  TimeResponse = 5000,
}

const TabName = {
  Characteristics: { id: 'characteristics', value: 'Характеристики' },
  Description: { id: 'description', value: 'Описание' },
};

enum ErrorInfoMessage {
  Error = 'Произошла ошибка:',
  TryLater = 'Попробуйте позже.',
  CheckInternet = 'Не удалось подключиться к серверу. Проверьте интернет-соединение.',
  ErrorFilterAndSortingContext = 'useFilterAndSortingContext must be used within a FilterAndSortingProvider',
}

const ReviewValidInfoMessage = {
  name: 'от 2 до 15 символов',
  plus: 'от 10 до 160 символов',
  minus: 'от 10 до 160 символов',
  comment: 'от 10 до 160 символов',
};

const Validation = {
  CameraPrice: /[^0-9]/g,
  DecimalPartIsZero: /^0+$/,
  CouponInput: /\s/g,
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
  Sort = 'sort',
  SortIcon = 'sort-icon',
  SortType = 'catalog-sort__type',
  SortOrder = 'catalog-sort__order',
  BasketItemShort = 'basket-item--short',
  BasketSummary = 'basket__summary-value',
  BasketSummaryBonus = 'basket__summary-value--bonus',
  Success = 'Success',
  Modal = 'modal',
  ModalNarrow = 'modal--narrow',
  Rate = 'rate',
  User = 'user-',
  FormReviewItem = 'form-review__item',
  CustomTextArea = 'custom-textarea',
  CustomInput = 'custom-input',
  TextArea = 'textarea',
  Input = 'input',
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
  ToSort = 'Сортировать: ',
  Filter = 'Фильтр',
  PriceSymbol = ', ₽',
  InBasket = 'В корзине',
  IncreaseQuantity = 'увеличить количество товара',
  DecreaseQuantity = 'уменьшить количество товара',
  Quantity = 'количество товара',
  TotalPrice = 'Общая цена:',
  IsTherePromoCode = 'Если у вас есть промокод на скидку, примените его в этом поле',
  EnterPromoCode = 'Введите промокод',
  InvalidPromoCode = 'Промокод неверный',
  ValidPromoCode = 'Промокод принят!',
  Total = 'Всего:',
  Discount = 'Скидка:',
  ForPayment = 'К оплате:',
  PlaceAnOrder = 'Оформить заказ',
  FoundError = '404 ERROR',
  PageNotFound = 'Страница не найдена',
  CreatingOrder = 'Создание заказа',
  Wait = 'Подождите...',
  NewReview = 'Оставить свой отзыв',
  Rating = 'Рейтинг',
  NeedToEvaluate = 'Нужно оценить товар',
  SlashSymbol = '/',
  Error = 'Ошибка',
  CheckCoupon = 'Проверка промокода',
  TryAgain = 'Попробуйте ещё раз'
}

const REVIEW_PARAM = [
  {
    title: 'Ваше имя',
    id: 'name',
    info: 'Введите ваше имя',
    error: 'Нужно указать имя',
  },
  {
    title: 'Достоинства',
    id: 'plus',
    info: 'Основные преимущества товара',
    error: 'Нужно указать достоинства',
  },
  {
    title: 'Недостатки',
    id: 'minus',
    info: 'Главные недостатки товара',
    error: 'Нужно указать недостатки',
  },
  {
    title: 'Комментарий',
    id: 'comment',
    info: 'Поделитесь своим опытом покупки',
    error: 'Нужно добавить комментарий',
  },
];

enum BemMode {
  Void = '',
  Mono = '-mono',
  Full = '-full',
  IsActive = 'is-active',
  Active = '--active',
  Prev = '--prev',
  Next = '--next',
  Disabled = 'disabled',
  IsInvalid = 'is-invalid',
  IsValid = 'is-valid',
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
  Radio = 'radio',
  Checkbox = 'checkbox',
  Number = 'number',
  String = 'string',
  RuRubleSymbol = '₽',
  OrderState = 'orderState',
  PromoCode = 'Промокод',
  UseCode = 'Применить',
  CommentId = 'comment',
  RateField = 'rate',
  UserNameField = 'name',
  ErrorNetwork = 'ERR_NETWORK'
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
const Rating = {
  ['Отлично']: 5,
  ['Хорошо']: 4,
  ['Нормально']: 3,
  ['Плохо']: 2,
  ['Ужасно']: 1,
} as const;

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
}

enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed',
}

enum ModalType {
  CallItem = 'callItem',
  AddItem = 'addItem',
  AddItemSuccess = 'addItemSuccess',
  RemoveItem = 'removeItem',
  RemoveItemSuccess = 'removeItemSuccess',
  BasketSuccess = 'basketSuccess',
  CreateOrder = 'createOrder',
  NewReview = 'createReview',
  ReviewSuccess = 'reviewSuccess',
  Error = 'error',
  CheckCoupon = 'checkCoupon',
}

enum ModalTitle {
  CallItem = 'Свяжитесь со мной',
  AddItem = 'Добавить товар в корзину',
  AddItemSuccess = 'Товар успешно добавлен в корзину',
  RemoveItem = 'Удалить этот товар?',
  BasketSuccess = 'Спасибо за покупку',
  Error = 'Произошла ошибка',
  NewReview = 'Оставить отзыв',
  ReviewSuccess = 'Спасибо за отзыв',
}

enum ModalStatus {
  Open = 'true',
  Close = 'false',
}

enum InputType {
  String = 'string',
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
  FetchNewReview = 'REVIEWS/fetchNewReview',
  FetchOrder = 'ORDER/fetchOrder',
  FetchCoupon = 'ORDER/fetchCoupon',
  UpdateAllSetCurrentId = 'UpdateAllCamerasAndSetCurrentCameraId',
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

enum KeyboardButtonName {
  Tab = 'Tab',
  ArrowDown = 'ArrowDown',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  ArrowLeft = 'ArrowLeft',
  Enter = 'Enter',
  Escape = 'Escape',
}

const DiscountParam = {
  QuantityIsTwo: 2,
  QuantityIsThree: 3,
  QuantityIsFive: 5,
  QuantityIsSix: 6,
  QuantityIsTen: 10,
  OnePercent: 1,
  TwoPercent: 2,
  ThreePercent: 3,
  FivePercent: 5,
  TenPercent: 10,
  FifteenPercent: 15,
  TenThousand: 10000,
  TwentyThousand: 20000,
  ThirtyThousand: 30000,
  BaseMultiplier: 1,
  PercentScale: 100,
};

enum LoaderStatus {
  Pending = 'pending',
  Error = 'error',
  Coupon = 'coupon',
}

const LoaderParam = {
  [LoaderStatus.Pending]: {
    info: ExplanationWord.CreatingOrder,
    action: ExplanationWord.Wait,
  },
  [LoaderStatus.Error]: {
    info: ExplanationWord.Error,
    action: ExplanationWord.TryAgain,
  },
  [LoaderStatus.Coupon]: {
    info: ExplanationWord.CheckCoupon,
    action: ExplanationWord.Wait,
  },
};

export {
  ApiActionName,
  APIRoute,
  BannerParam,
  BemClass,
  BemMode,
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
  InputType,
  KeyboardButtonName,
  SearchParam,
  DiscountParam,
  Rating,
  REVIEW_PARAM,
  ReviewValidInfoMessage,
  LoaderStatus,
  LoaderParam,
};
