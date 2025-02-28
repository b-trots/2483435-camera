enum AppRoute {
  Main = '/',
  Cameras = '/cameras/:id',
}

const TabName = {
  Characteristics: 'Характеристики',
  Description: 'Описание',
};

enum Error {
  PhoneInput = 'Допустимы только цифры, пробелы, скобки, тире и "+"',
  PhoneSubmit = 'Введите корректный номер телефона в формате +7(9XX)XXX-XX-XX',
}

const Validation = {
  PhoneInput: /^[\d\s()+-]*$/,
  PhoneSubmit: /^(\+7|8)?\s*\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
} as const;

enum TitleName {
  StoreName = 'Фотошоп',
  Catalog = 'Каталог',
  Basket = 'Корзина',
}

enum LogoParam {
  Name = 'Переход на главную',
  Width = 100,
  Height = 36,
}

const NAVIGATE = [
  { name: 'Каталог', path: AppRoute.Main },
  { name: 'Гарантии', path: AppRoute.Main },
  { name: 'Доставка', path: AppRoute.Main },
  { name: ' О компании', path: AppRoute.Main },
];

export { AppRoute, TabName, Error, Validation, TitleName, LogoParam, NAVIGATE};
