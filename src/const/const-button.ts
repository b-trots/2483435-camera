enum ButtonBemClass {
  Modal = 'modal__btn',
  ProductCard = 'product-card__btn',
  Review = 'form-review__btn',
  FitWidth = 'modal__btn--fit-width',
  HalfWidth = 'modal__btn--half-width',
  PaginationText = 'pagination__link--text',
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
}

enum PaginationButton {
  Text = 'Далее',
}

export {
  ButtonBemClass,
  ActiveButtonName,
  PassiveButtonName,
  SliderButtonName,
  CloseButtonParam,
  PaginationButton,
};
