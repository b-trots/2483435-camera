import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import { toCloseModal } from './to-close-modal';

describe('toCloseModal', () => {
  let containerRef: React.RefObject<HTMLDivElement>;
  let modalRef: React.RefObject<HTMLDivElement>;
  let closeButtonRef: React.RefObject<HTMLButtonElement>;
  let onClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    containerRef = { current: document.createElement('div') };
    modalRef = { current: document.createElement('div') };
    closeButtonRef = { current: document.createElement('button') };
    onClose = vi.fn();

    if (
      containerRef.current !== null &&
      containerRef.current !== null &&
      modalRef.current !== null &&
      closeButtonRef.current !== null
    ) {
      document.body.appendChild(containerRef.current);
      containerRef.current.appendChild(modalRef.current);
      modalRef.current.appendChild(closeButtonRef.current);
    }
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('should call onClose when Escape key is pressed', () => {
    toCloseModal(containerRef, modalRef, closeButtonRef, onClose);

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when clicking inside the container', () => {
    toCloseModal(containerRef, modalRef, closeButtonRef, onClose);

    const event = new MouseEvent('click', { bubbles: true });
    if (containerRef.current !== null) {
      containerRef.current.dispatchEvent(event);
    }

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should remove event listeners when cleanup is called', () => {
    const cleanup = toCloseModal(
      containerRef,
      modalRef,
      closeButtonRef,
      onClose
    );

    if (cleanup) {
      cleanup();
    }

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    const outsideClickEvent = new MouseEvent('click', { bubbles: true });
    document.body.dispatchEvent(outsideClickEvent);

    const closeButtonEvent = new MouseEvent('click', { bubbles: true });
    if (containerRef.current !== null) {
      containerRef.current.dispatchEvent(closeButtonEvent);
    }

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should return early if any ref is null', () => {
    const nullContainerRef = {
      current: null,
    } as React.RefObject<HTMLDivElement>;
    toCloseModal(nullContainerRef, modalRef, closeButtonRef, onClose);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should call onClose when the close button is clicked', () => {
    toCloseModal(containerRef, modalRef, closeButtonRef, onClose);

    const event = new MouseEvent('click', { bubbles: true });
    if (closeButtonRef.current !== null) {
      closeButtonRef.current.dispatchEvent(event);
    }

    expect(onClose).toHaveBeenCalledTimes(1);
  });

});
