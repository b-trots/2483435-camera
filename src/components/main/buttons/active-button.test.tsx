import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ActiveButton } from './active-button';
import {
  ButtonBemClass,
  ActiveButtonName,
  ButtonType,
} from '@/const/const-button';

describe('Component: ActiveButton', () => {
  const testText = 'Test Button' as ActiveButtonName;
  const mockOnClick = vi.fn();

  it('should render basic button correctly', () => {
    render(<ActiveButton text={testText} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(ButtonBemClass.Btn);
    expect(button).toHaveClass(ButtonBemClass.BtnPurple);
    expect(button).toHaveTextContent(testText);
    expect(button).not.toBeDisabled();
  });

  it('should handle onClick event', () => {
    render(<ActiveButton text={testText} onClick={mockOnClick} />);

    const button = screen.getByRole('button');
    button.click();

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should apply custom className', () => {
    render(
      <ActiveButton text={testText} className={'custom-class' as ButtonBemClass} />
    );

    expect(screen.getByRole('button')).toHaveClass('custom-class' as ButtonBemClass);
  });

  it('should apply fitWidth class when isFitWidth is true', () => {
    render(<ActiveButton text={testText} isFitWidth />);

    expect(screen.getByRole('button')).toHaveClass(ButtonBemClass.FitWidth);
  });

  it('should apply halfWidth class when isHalfWidth is true', () => {
    render(<ActiveButton text={testText} isHalfWidth />);

    expect(screen.getByRole('button')).toHaveClass(ButtonBemClass.HalfWidth);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<ActiveButton text={testText} disabled />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should forward ref correctly', () => {
    const ref = vi.fn();
    render(<ActiveButton text={testText} ref={ref} />);

    expect(ref).toHaveBeenCalledWith(screen.getByRole('button'));
  });

  it('should have correct button type', () => {
    render(<ActiveButton text={testText} type={ButtonType.Submit} />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should memoize component correctly', () => {
    const { rerender } = render(
      <ActiveButton
        text={testText}
        onClick={mockOnClick}
        className={'test' as ButtonBemClass}
      />
    );

    const initialRenderCount = mockOnClick.mock.calls.length;

    rerender(
      <ActiveButton
        text={testText}
        onClick={mockOnClick}
        className={'test' as ButtonBemClass}
      />
    );

    expect(mockOnClick.mock.calls.length).toBe(initialRenderCount);
  });
});
