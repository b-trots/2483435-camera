enum ButtonBemClass {
  Modal = 'modal__btn',
  ProductCard = 'product-card__btn',
  Review = 'form-review__btn',
  FitWidth = 'modal__btn--fit-width',
  HalfWidth = 'modal__btn--half-width',
  PaginationText = 'pagination__link--text',
  FormSearchReset = 'form-search__reset',
  Cross = 'cross-btn'
}

enum ActiveButtonName {
  AddToBasket = 'Добавить в корзину',
  Delete = 'Удалить',
  ToOrder = 'Заказать',
  PlaceAnOrder = 'Оформить заказ',
  Buy = 'Купить',
  Basket = 'Перейти в корзину',
  Return = 'Вернуться к покупкам',
  Review = 'Отправить отзыв',
  MoreReviews = 'Показать больше отзывов',
}

enum PassiveButtonName {
  Details = 'Подробнее',
}

enum SliderButtonName {
  Prev = 'Предыдущий слайд',
  Next = 'Следующий слайд',
}

enum CloseButtonParam {
  CloseButtonSize = 10,
  ClosePopap = 'Закрыть попап',
  DeleteProduct = 'Удалить товар',
  ResetSearch = 'Сбросить поиск',
  AriaLabel = 'aria-label'
}

enum PaginationButton {
  Text = 'Далее',
}

enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}

export {
  ButtonBemClass,
  ActiveButtonName,
  PassiveButtonName,
  SliderButtonName,
  CloseButtonParam,
  PaginationButton,
  ButtonType
};
