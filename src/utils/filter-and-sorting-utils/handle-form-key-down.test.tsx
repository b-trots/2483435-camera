import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef } from 'react';
import { handleFormKeyDown } from './handle-form-key-down';

const TestForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const onKeyDown = (e: React.KeyboardEvent) => handleFormKeyDown(e, formRef);

  return (
    <form ref={formRef} data-testid="form" onKeyDown={onKeyDown}>
      <input data-testid="input-1" tabIndex={0} type="text" />
      <button data-testid="button-1" tabIndex={0} type="button">
        Button 1
      </button>
      <button data-testid="button-disabled" disabled tabIndex={0} type="button">
        Button Disabled
      </button>
      <button data-testid="button-hidden" tabIndex={-1} type="button">
        Hidden Button
      </button>
      <input data-testid="input-2" tabIndex={0} type="text" />
    </form>
  );
};

describe('handleFormKeyDown', () => {
  beforeEach(() => {
    render(<TestForm />);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should move focus to the next element on Tab', async () => {
    const user = userEvent.setup();
    const input1 = screen.getByTestId('input-1');
    const input2 = screen.getByTestId('button-1');

    input1.focus();
    expect(document.activeElement).toBe(input1);

    await user.keyboard('[Tab]');
    expect(document.activeElement).toBe(input2);
  });

  it('should move focus to the previous element on Shift+Tab', async () => {
    const user = userEvent.setup();
    const input1 = screen.getByTestId('input-1');
    const input2 = screen.getByTestId('button-1');

    input2.focus();
    expect(document.activeElement).toBe(input2);

    await user.keyboard('[ShiftLeft>][Tab][/ShiftLeft]');
    expect(document.activeElement).toBe(input1);
  });

  it('should move focus to the next element on ArrowDown', async () => {
    const user = userEvent.setup();
    const input1 = screen.getByTestId('input-1');
    const input2 = screen.getByTestId('button-1');

    input1.focus();
    expect(document.activeElement).toBe(input1);

    await user.keyboard('[ArrowDown]');
    expect(document.activeElement).toBe(input2);
  });

  it('should move focus to the previous element on ArrowUp', async () => {
    const user = userEvent.setup();
    const input1 = screen.getByTestId('input-1');
    const input2 = screen.getByTestId('button-1');

    input2.focus();
    expect(document.activeElement).toBe(input2);

    await user.keyboard('[ArrowUp]');
    expect(document.activeElement).toBe(input1);
  });

  it('should click the focused element on Enter', async () => {
    const user = userEvent.setup();
    const button = screen.getByTestId('button-1');
    const clickMock = vi.fn();

    button.addEventListener('click', clickMock);

    button.focus();
    await user.keyboard('[Enter]');

    expect(clickMock).toHaveBeenCalledTimes(1);
  });

  it('should not move focus to disabled elements', async () => {
    const user = userEvent.setup();
    const input1 = screen.getByTestId('button-1');
    const disabledButton = screen.getByTestId('button-disabled');
    const input2 = screen.getByTestId('input-2');

    input1.focus();
    expect(document.activeElement).toBe(input1);

    await user.keyboard('[Tab]');
    expect(document.activeElement).toBe(input2);

    expect(document.activeElement).not.toBe(disabledButton);
  });

  it('should ignore elements with negative tabIndex', async () => {
    const user = userEvent.setup();
    const input1 = screen.getByTestId('button-1');
    const hiddenButton = screen.getByTestId('button-hidden');
    const input2 = screen.getByTestId('input-2');

    input1.focus();
    expect(document.activeElement).toBe(input1);

    await user.keyboard('[Tab]');
    expect(document.activeElement).toBe(input2);

    expect(document.activeElement).not.toBe(hiddenButton);
  });

  it('should return early if formRef.current is null', () => {
    const mockEvent = {
      preventDefault: vi.fn(),
      key: ['Tab'],
    } as unknown as React.KeyboardEvent;

    const formRef = { current: null };

    handleFormKeyDown(mockEvent, formRef);

    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('should return early if currentIndex is -1 (element not in focusableElements)', () => {
    const mockEvent = {
      preventDefault: vi.fn(),
      key: ['Tab'],
    } as unknown as React.KeyboardEvent;

    const formRef = {
      current: document.createElement('form'),
    };

    const input = document.createElement('input');
    input.setAttribute('tabindex', '0');
    formRef.current.appendChild(input);

    document.body.appendChild(formRef.current);
    document.body.focus();

    handleFormKeyDown(mockEvent, formRef);

    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });
});
