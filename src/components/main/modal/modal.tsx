import { useRef, useEffect, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import { ModalWindow } from '../../../const/const';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { getActiveModal } from '../../../store/slices/modal/modal-selectors';
import { closeModal } from '../../../store/slices/modal/modal-slice';
import { toCloseModal } from '../../../utils/modal-utils/to-close-modal';
import { toLoopFocus } from '../../../utils/modal-utils/to-loop-focus';
import { CloseButton } from '../buttons/close-button';
import { RemoveScroll } from 'react-remove-scroll';

const modalRoot = document.getElementById('modal-root');

type ModalProps = {
  children: React.ReactNode;
};

export function Modal({ children }: ModalProps) {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(getActiveModal);
  const isOpen = activeModal === ModalWindow.CallItem;

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const modalRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstTabRef = useRef<HTMLInputElement | null>(null);
  const lastTabRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    toLoopFocus(containerRef, firstTabRef, lastTabRef);
    toCloseModal(containerRef, modalRef, lastTabRef, handleModalClose);
  });

  if (!modalRoot) {
    return null;
  }

  return !isOpen ? null : (
    <RemoveScroll removeScrollBar={false}>
      {ReactDOM.createPortal(
        <div className="modal is-active" ref={containerRef}>
          <div className="modal__wrapper">
            <div className="modal__overlay" />
            <div className="modal__content" ref={modalRef}>
              {cloneElement(children as React.ReactElement, {
                ref: firstTabRef,
              })}
              <CloseButton lastTabRef={lastTabRef} />
            </div>
          </div>
        </div>,
        modalRoot
      )}
    </RemoveScroll>
  );
}
