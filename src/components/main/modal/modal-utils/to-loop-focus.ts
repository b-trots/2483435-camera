import { FocusableElements } from '../../../../types/types';

const toLoopFocus = (
  modalContainer: React.RefObject<HTMLDivElement>,
  firstRef: React.RefObject<FocusableElements | null>,
  lastRef: React.RefObject<FocusableElements | null>
) => {
  if (!modalContainer.current) {
    return;
  }

  const container = modalContainer.current;
  const firstElement = firstRef.current;
  const lastElement = lastRef.current;

  const handleTabKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') {
      return;
    }

    const target = e.target as FocusableElements;

    if (e.shiftKey) {
      if (target === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      }
    } else {
      if (target === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    }
  };

  if (firstElement) {
    firstElement.focus();
  }

  container.addEventListener('keydown', handleTabKeyDown);

  return () => {
    container.removeEventListener('keydown', handleTabKeyDown);
  };
};

export { toLoopFocus };
