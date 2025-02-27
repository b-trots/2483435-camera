const handleModalClose = (
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
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modal && !modal.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleCloseButtonClick = (e: MouseEvent) => {
    if (e.currentTarget === closeButton) {
      onClose();
    }
  };

  container.addEventListener('click', handleOutsideClick);
  modal.addEventListener('keydown', handleEscapeKeyDown);
  closeButton.addEventListener('click', handleCloseButtonClick);

  return () => {
    container.removeEventListener('click', handleOutsideClick);
    modal.removeEventListener('keydown', handleEscapeKeyDown);
    closeButton.removeEventListener('click', handleCloseButtonClick);
  };
};

export { handleModalClose };
