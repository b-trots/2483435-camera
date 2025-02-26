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

export { AppRoute, TabName, Error, Validation };
