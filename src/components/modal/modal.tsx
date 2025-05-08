import { ModalContainer } from './modal-container';
import { ModalType } from '@/const/const';
import { useAppSelector } from '@/hooks/hooks';
import {
  getActiveModal,
  getModalCamera,
} from '../../store/slices/modal/modal-selectors';
import { AddItem } from './add-item/add-item';
import { AddItemSuccess } from './add-item-success';

export function Modal() {
  const activeModal = useAppSelector(getActiveModal);
  const isOpen = activeModal !== null;
  const modalCamera = useAppSelector(getModalCamera);
  const modals: Record<string, React.ReactNode> = {
    [ModalType.AddItem]: modalCamera ? <AddItem /> : null,
    [ModalType.AddItemSuccess]: <AddItemSuccess />,
  };

  const modalContent = modals[activeModal as ModalType] || null;

  if (!isOpen || !modalContent) {
    return null;
  }

  return <ModalContainer modal={activeModal}>{modalContent}</ModalContainer>;
}
