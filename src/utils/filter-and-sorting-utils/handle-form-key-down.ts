export const handleFormKeyDown = (
  e: React.KeyboardEvent,
  formRef: React.MutableRefObject<HTMLFormElement | null>
) => {
  if (!formRef.current) {
    return;
  }

  const focusableElements: HTMLElement[] = Array.from(
    formRef.current.elements
  ).filter(
    (element): element is HTMLElement =>
      element instanceof HTMLElement &&
      element.tabIndex === 0 &&
      !element.hasAttribute('disabled')
  );

  const currentIndex = focusableElements.indexOf(
    document.activeElement as HTMLElement
  );

  if (currentIndex === -1) {
    return;
  }

  const moveFocus = (nextIndex: number) => {
    focusableElements[nextIndex]?.focus();
    e.preventDefault();
  };

  switch (e.key) {
    case 'Tab':
      if (e.shiftKey) {
        if (currentIndex > 0) {
          moveFocus(currentIndex - 1);
        }
      } else {
        if (currentIndex < focusableElements.length - 1) {
          moveFocus(currentIndex + 1);
        }
      }
      break;

    case 'ArrowDown':
    case 'ArrowRight':
      moveFocus((currentIndex + 1) % focusableElements.length);
      break;

    case 'ArrowUp':
    case 'ArrowLeft':
      moveFocus(
        (currentIndex - 1 + focusableElements.length) % focusableElements.length
      );
      break;

    case 'Enter': {
      const target = document.activeElement as HTMLInputElement;
      target.click();
      e.preventDefault();

      break;
    }

    default:
      break;
  }
};
