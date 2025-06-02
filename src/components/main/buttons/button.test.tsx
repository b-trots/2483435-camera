import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';
import { ButtonBemClass, ButtonType, ButtonName } from '@/const/const-button';

describe('Component: Button', () => {
  const testText = 'submit' as ButtonName;
  const testType = 'button' as ButtonType;
  const testClass = ButtonBemClass.BtnPurple;
  const mockOnClick = vi.fn();

  it('renders correctly with required props', () => {
    render(<Button type={testType} bemClass={testClass} text={testText} />);

    const button = screen.getByRole('button', { name: testText });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(ButtonBemClass.Btn);
    expect(button).toHaveClass(testClass);
    expect(button).toHaveAttribute('type', testType);
    expect(button).toHaveTextContent(testText);
  });

  it('calls onClick handler when clicked', () => {
    render(
      <Button
        type={testType}
        bemClass={testClass}
        text={testText}
        onClick={mockOnClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['button' as ButtonType],
    ['submit' as ButtonType],
    ['reset' as ButtonType],
  ])('renders correctly with type %s', (type) => {
    render(<Button type={type} bemClass={testClass} text={testText} />);

    expect(screen.getByRole('button')).toHaveAttribute('type', type);
  });

  it('renders without onClick handler', () => {
    render(<Button type={testType} bemClass={testClass} text={testText} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });

  it.each([
    ['Submit' as ButtonName],
    ['Cancel' as ButtonName],
    ['Send' as ButtonName],
  ])('displays correct text: %s', (text) => {
    render(<Button type={testType} bemClass={testClass} text={text} />);

    expect(screen.getByRole('button')).toHaveTextContent(text);
  });
});
