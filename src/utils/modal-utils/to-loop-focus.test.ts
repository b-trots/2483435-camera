import { FocusableElements } from '@/types/types';
import { toLoopFocus } from './to-loop-focus';

describe('toLoopFocus', () => {
  let modalContainer: React.RefObject<HTMLDivElement>;
  let firstRef: React.RefObject<FocusableElements>;
  let lastRef: React.RefObject<FocusableElements>;

  beforeEach(() => {
    modalContainer = { current: document.createElement('div') };
    firstRef = { current: document.createElement('button') };
    lastRef = { current: document.createElement('button') };

    if (
      modalContainer.current !== null &&
      firstRef.current !== null &&
      lastRef.current !== null
    ) {
      document.body.appendChild(modalContainer.current);
      modalContainer.current.appendChild(firstRef.current);
      modalContainer.current.appendChild(lastRef.current);
    }
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should initialize focus on the first element', () => {
    const cleanup = toLoopFocus(modalContainer, firstRef, lastRef);
    expect(document.activeElement).toBe(firstRef.current);

    cleanup?.();
  });

  it('should move focus to the first element when Tab is pressed on the last element', () => {
    const cleanup = toLoopFocus(modalContainer, firstRef, lastRef);

    if (lastRef.current !== null) {
      lastRef.current.focus();
    }

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
    });

    if (lastRef.current !== null) {
      lastRef.current.dispatchEvent(event);
    }

    expect(document.activeElement).toBe(firstRef.current);

    cleanup?.();
  });

  it('should move focus to the last element when Shift+Tab is pressed on the first element', () => {
    const cleanup = toLoopFocus(modalContainer, firstRef, lastRef);
    if (firstRef.current !== null) {
      firstRef.current.focus();
    }

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
    });
    if (firstRef.current !== null) {
      firstRef.current.dispatchEvent(event);
    }

    expect(document.activeElement).toBe(lastRef.current);

    cleanup?.();
  });

  it('should do nothing if modalContainer is not defined', () => {
    const nullContainerRef = {
      current: null,
    } as React.RefObject<HTMLDivElement>;

    const cleanup = toLoopFocus(nullContainerRef, firstRef, lastRef);

    expect(cleanup).toBeUndefined();
  });

  it('should do nothing if firstRef or lastRef is not defined', () => {
    const nullFirstRef = {
      current: null,
    } as React.RefObject<HTMLDivElement>;

    const cleanup = toLoopFocus(modalContainer, nullFirstRef, lastRef);

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
    });

    if (modalContainer.current !== null) {
      modalContainer.current.dispatchEvent(event);
    }

    expect(document.activeElement).not.toBe(lastRef.current);
    cleanup?.();
  });

  it('should not move focus when a non-Tab key is pressed', () => {
    toLoopFocus(modalContainer, firstRef, lastRef);
    if (firstRef.current !== null) {
      firstRef.current.focus();
    }

    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    if (modalContainer.current !== null) {
      modalContainer.current.dispatchEvent(event);
    }

    expect(document.activeElement).toBe(firstRef.current);
  });
});
