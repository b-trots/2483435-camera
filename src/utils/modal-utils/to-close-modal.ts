import { KeyboardButtonName } from '../../const/const';

const toCloseModal = (
  containerRef: React.RefObject<HTMLDivElement>,
  modalRef: React.RefObject<HTMLDivElement>,
  closeButtonRef: React.RefObject<HTMLButtonElement>,
  onClose: () => void
) => {
  const container = containerRef.current;
  const modal = modalRef.current;
  const closeButton = closeButtonRef.current;

  if (!container || !modal || !closeButton) {
    return;
  }

  const handleEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === KeyboardButtonName.Escape) {
      e.stopPropagation();
      e.preventDefault();

      onClose();
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (container && !container.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleCloseButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  container.addEventListener('click', handleOutsideClick);
  closeButton.addEventListener('click', handleCloseButtonClick);
  document.addEventListener('keydown', handleEscapeKeyDown);

  return () => {
    container.removeEventListener('click', handleOutsideClick);
    closeButton.removeEventListener('click', handleCloseButtonClick);
    document.removeEventListener('keydown', handleEscapeKeyDown);
  };
};

export { toCloseModal };
