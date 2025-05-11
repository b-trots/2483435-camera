import { useRef, useEffect, cloneElement } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { useAppDispatch } from '@/hooks/hooks';
import { closeModal } from '@/store/slices/modal/modal-slice';
import { toCloseModal } from '@/utils/modal-utils/to-close-modal';
import { CloseButton } from '../main/buttons/close-button';
import { toLoopFocus } from '@/utils/modal-utils/to-loop-focus';
import { ButtonBemClass, ButtonType } from '@/const/const-button';
import classNames from 'classnames';
import { BemClass, BemMode, ModalType } from '@/const/const';

type ModalProps = {
  modal: ModalType;
  children: React.ReactNode;
};

export function ModalContainer({ modal, children }: ModalProps) {
  const dispatch = useAppDispatch();
  const isNarrow = modal.endsWith(BemClass.Success);
  const modalClassName = classNames(
    BemClass.Modal,
    BemMode.IsActive,
    isNarrow && BemClass.ModalNarrow
  );
  const isLoading = modal === ModalType.Loading;

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  const modalRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstTabRef = useRef<HTMLInputElement | HTMLButtonElement | null>(null);
  const lastTabRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (containerRef.current && modalRef.current && lastTabRef.current) {
      const cleanup = toCloseModal(
        containerRef,
        modalRef,
        lastTabRef,
        handleModalClose
      );
      toLoopFocus(containerRef, firstTabRef, lastTabRef);
      return cleanup;
    }
  });

  return (
    <RemoveScroll removeScrollBar={false}>
      <div className={modalClassName} ref={containerRef}>
        <div className="modal__wrapper">
          {isLoading ? (
            children
          ) : (
            <>
              <div className="modal__overlay" onClick={handleModalClose} />
              <div className="modal__content" ref={modalRef}>
                {cloneElement(children as React.ReactElement, {
                  ref: firstTabRef,
                })}
                <CloseButton
                  bemClass={ButtonBemClass.Cross}
                  type={ButtonType.Button}
                  lastTabRef={lastTabRef}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </RemoveScroll>
  );
}
