import { ModalContainer } from './modal-container';
import { CallItem } from './call-item/call-item';
import { ModalType } from '../../const/const';
import { useAppSelector } from '../../hooks/hooks';
import {
  getActiveModal,
  getModalCamera,
} from '../../store/slices/modal/modal-selectors';

export function Modal() {
  const activeModal = useAppSelector(getActiveModal);
  const isOpen = activeModal !== null;
  const modalCamera = useAppSelector(getModalCamera);
  const modals: Record<string, React.ReactNode> = {
    [ModalType.CallItem]: modalCamera ? (
      <CallItem modalCamera={modalCamera} />
    ) : null,
  };

  const modalContent = modals[activeModal as ModalType] || null;

  if (!isOpen || !modalContent) {
    return null;
  }

  return <ModalContainer>{modalContent}</ModalContainer>;
}
