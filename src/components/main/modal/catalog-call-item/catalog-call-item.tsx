import { useEffect, useRef, useState } from 'react';
import mockProducts from '../../../../mock/mock';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { Error, Validation } from '../../../../const';

type CallItemProps = {
  productId: number;
  onClose: () => void;
};
export function CallItem({ productId, onClose }: CallItemProps) {
  const product = mockProducts.find((item) => item.id === productId)!;
  const { name, vendorCode, level, category, price } = product;

  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      const focusableElements = [
        firstInputRef.current,
        closeButtonRef.current,
      ].filter(Boolean) as HTMLElement[];

      const lastIndex = focusableElements.length - 1;
      const focusedIndex = focusableElements.indexOf(
        document.activeElement as HTMLElement
      );

      if (e.shiftKey && focusedIndex === 0) {
        focusableElements[lastIndex].focus();
        e.preventDefault();
      } else if (!e.shiftKey && focusedIndex === lastIndex) {
        focusableElements[0].focus();
        e.preventDefault();
      }
    }
  };


  useEffect(() => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKeyDown);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDown);
    };
  });

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const [phone, setPhone] = useState('');
  const [isToastShown, setIsToastShown] = useState(false);


  const notify = (message: string) => toast.error(message);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (Validation.PhoneInput.test(input)) {
      toast.dismiss();
      setPhone(input);
      setIsToastShown(false);
    } else {
      if (isToastShown) {
        return;
      }
      notify(Error.PhoneInput);
      setIsToastShown(true);
      setTimeout(() => setIsToastShown(false), 3000);
    }
  };

  const handleSubmit = () => {
    if (!Validation.PhoneSubmit.test(phone)) {
      notify(Error.PhoneSubmit);
      return;
    }

    const standardizedPhone = phone
      .replace(/\D/g, '')
      .replace(/^8/, '7')
      .replace(/^7/, '+7');

    console.log(standardizedPhone, productId);
    onClose();
  };


  return (
    <div className="modal is-active" tabIndex={-1} onKeyDown={handleTabKeyDown}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleClickOutside} />
        <div className="modal__content" ref={modalRef}>
          <p className="title title--h4">Свяжитесь со мной</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/orlenok.webp, img/content/orlenok@2x.webp 2x"
                />
                <img
                  src="img/content/orlenok.jpg"
                  srcSet="img/content/orlenok@2x.jpg 2x"
                  width={140}
                  height={120}
                  alt="Фотоаппарат «Орлёнок»"
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{category}</li>
                <li className="basket-item__list-item">{level}</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>
                {price} ₽
              </p>
            </div>
          </div>
          <div className="custom-input form-review__item">
            <label>
              <span className="custom-input__label">
                Телефон
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                ref={firstInputRef}
                type="tel"
                name="user-tel"
                value={phone}
                placeholder="Введите ваш номер"
                required
                onChange={handlePhoneChange}
              />
            </label>
            <ToastContainer
              autoClose={3000}
              limit={1}
              hideProgressBar
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
              theme="colored"
              transition={Flip}
              style={{
                position: 'absolute',
                top: '85px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
            {/* {error && <p className="custom-input__error">{error}</p>} */}
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={handleSubmit}
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Заказать
            </button>
          </div>
          <button
            ref={closeButtonRef}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={onClose}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
