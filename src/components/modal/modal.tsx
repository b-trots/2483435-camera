import { ModalContainer } from './modal-container';
import { LoaderStatus, ModalType } from '@/const/const';
import { useAppSelector } from '@/hooks/hooks';
import {
  getActiveModal,
  getModalCamera,
} from '../../store/slices/modal/modal-selectors';
import { AddItem } from './add-item/add-item';
import { AddItemSuccess } from './add-item-success';
import { BasketRemoveItem } from './basket-remove-item';
import { BasketSuccess } from './basket-success';
import { Loader } from './loader/loader';
import { NewReview } from './new-review/new-review';
import { ReviewSuccess } from './review-success';

export function Modal() {
  const activeModal = useAppSelector(getActiveModal);
  const isOpen = activeModal !== null;
  const modalCamera = useAppSelector(getModalCamera);
  const modals: Record<string, React.ReactNode> = {
    [ModalType.AddItem]: modalCamera ? <AddItem /> : null,
    [ModalType.AddItemSuccess]: <AddItemSuccess />,
    [ModalType.RemoveItem]: modalCamera ? <BasketRemoveItem /> : null,
    [ModalType.BasketSuccess]: <BasketSuccess />,
    [ModalType.CreateOrder]: <Loader status={LoaderStatus.Pending} />,
    [ModalType.Error]: <Loader status={LoaderStatus.Error} />,
    [ModalType.NewReview]: <NewReview />,
    [ModalType.ReviewSuccess]: <ReviewSuccess />,
    [ModalType.CheckCoupon]: <Loader status={LoaderStatus.Coupon} />,
  };

  const modalContent = modals[activeModal as ModalType] || null;

  if (!isOpen || !modalContent) {
    return null;
  }

  return <ModalContainer modal={activeModal}>{modalContent}</ModalContainer>;
}
