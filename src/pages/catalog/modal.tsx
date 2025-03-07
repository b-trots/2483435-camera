import { cloneElement, useEffect, useRef } from 'react';
import { ModalWindow } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getActiveModal } from '../../store/slices/modal/modal-selectors';
import { closeModal } from '../../store/slices/modal/modal-slice';
import { useNoScroll } from '../../hooks/use-no-scroll';
import { toLoopFocus } from '../../components/main/modal/modal-utils/to-loop-focus';
import { toCloseModal } from '../../components/main/modal/modal-utils/to-close-modal';
import { CloseButton } from '../../components/main/buttons/close-button';
import ReactDOM from 'react-dom';

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

  useNoScroll(containerRef, isOpen);

  if (!modalRoot) {
    return null;
  }

  return !isOpen
    ? null
    : ReactDOM.createPortal(
      <div className="modal is-active" ref={containerRef}>
        <div className="modal__wrapper">
          <div className="modal__overlay" />
          <div className="modal__content" ref={modalRef}>
            {cloneElement(children as React.ReactElement, { firstTabRef })}
            <CloseButton lastTabRef={lastTabRef} />
          </div>
        </div>
      </div>,
      modalRoot
    );
}
