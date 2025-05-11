import { DefaultParam, DiscountParam } from '@/const/const';
import { BasketItem } from '@/store/slices/order/order-selectors';

const applyDiscount = (cameras: BasketItem[]) => {
  const quantity = cameras.reduce(
    (acc, item) => acc + item.quantity,
    DefaultParam.ZeroValue
  );

  const totalPrice = cameras.reduce(
    (acc, item) => acc + item.price * item.quantity,
    DefaultParam.ZeroValue
  );

  let discount = DefaultParam.ZeroValue;

  if (quantity === DiscountParam.QuantityIsTwo) {
    discount = DiscountParam.ThreePercent;
  } else if (
    DiscountParam.QuantityIsThree <= quantity &&
    quantity <= DiscountParam.QuantityIsFive
  ) {
    discount = DiscountParam.FivePercent;
  } else if (
    DiscountParam.QuantityIsSix <= quantity &&
    quantity <= DiscountParam.QuantityIsTen
  ) {
    discount = DiscountParam.TenPercent;
  } else if (DiscountParam.QuantityIsTen < quantity) {
    discount = DiscountParam.FifteenPercent;
  }

  if (discount >= DiscountParam.OnePercent) {
    if (
      DiscountParam.TenThousand <= totalPrice &&
      totalPrice <= DiscountParam.TwentyThousand
    ) {
      discount -= DiscountParam.OnePercent;
    } else if (
      DiscountParam.TwentyThousand <= totalPrice &&
      totalPrice <= DiscountParam.ThirtyThousand
    ) {
      discount -= DiscountParam.TwoPercent;
    } else if (DiscountParam.ThirtyThousand < totalPrice) {
      discount -= DiscountParam.ThreePercent;
    }
  }

  return Math.round(
    (DiscountParam.BaseMultiplier - discount / DiscountParam.PercentScale) *
      totalPrice
  );
};

export { applyDiscount };
