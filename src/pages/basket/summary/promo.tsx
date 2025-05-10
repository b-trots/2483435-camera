import { ExplanationWord, NameSpace } from '@/const/const';

export function Promo() {
  return (
    <div className="basket__promo">
      <p className="title title--h4">
        {ExplanationWord.IsTherePromoCode}
      </p>
      <div className="basket-form">
        <form action="#">
          <div className="custom-input">
            <label>
              <span className="custom-input__label">{NameSpace.PromoCode}</span>
              <input type="text" name="promo" placeholder={ExplanationWord.EnterPromoCode} />
            </label>
            <p className="custom-input__error">{ExplanationWord.InvalidPromoCode}</p>
            <p className="custom-input__success">{ExplanationWord.ValidPromoCode}</p>
          </div>
          <button className="btn" type="submit">
            {NameSpace.UseCode}
          </button>
        </form>
      </div>
    </div>
  );
}
