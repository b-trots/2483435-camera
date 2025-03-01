enum ButtonBemClass {
  Modal = 'modal__btn',
  ProductCard = 'product-card__btn',
  Review = 'form-review__btn',
  FitWidth = 'modal__btn--fit-width',
  HalfWidth = 'modal__btn--half-width',
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
  MoreReview = 'Показать больше отзывов',
}

enum PassiveButtonName {
  Details = 'Подробнее',
}

enum CloseButtonParam {
  CloseButtonSize = 10,
  ClosePopap = 'Закрыть попап',
  DeleteProduct = 'Удалить товар',
}

export {
  ButtonBemClass,
  ActiveButtonName,
  PassiveButtonName,
  CloseButtonParam,
};
