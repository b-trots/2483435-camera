import {
  BemMode,
  DefaultParam,
  KeyboardButtonName,
  ServiceParam,
} from '@/const/const';

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
      element.tabIndex === ServiceParam.TabValueZero &&
      !element.hasAttribute(BemMode.Disabled)
  );

  const currentIndex = focusableElements.indexOf(
    document.activeElement as HTMLElement
  );

  if (currentIndex === ServiceParam.NegativeIndex) {
    return;
  }

  const moveFocus = (nextIndex: number) => {
    focusableElements[nextIndex]?.focus();
    e.preventDefault();
  };

  switch (e.key) {
    case KeyboardButtonName.Tab:
      if (e.shiftKey) {
        if (currentIndex > DefaultParam.ZeroIndex) {
          moveFocus(currentIndex - ServiceParam.IndexStep);
        }
      } else {
        if (currentIndex < focusableElements.length - ServiceParam.IndexStep) {
          moveFocus(currentIndex + ServiceParam.IndexStep);
        }
      }
      break;

    case KeyboardButtonName.ArrowDown:
    case KeyboardButtonName.ArrowRight:
      moveFocus(
        (currentIndex + ServiceParam.IndexStep) % focusableElements.length
      );
      break;

    case KeyboardButtonName.ArrowUp:
    case KeyboardButtonName.ArrowLeft:
      moveFocus(
        (currentIndex - ServiceParam.IndexStep + focusableElements.length) %
          focusableElements.length
      );
      break;

    case KeyboardButtonName.Enter: {
      const target = document.activeElement as HTMLInputElement;
      target.click();
      e.preventDefault();

      break;
    }

    default:
      break;
  }
};
