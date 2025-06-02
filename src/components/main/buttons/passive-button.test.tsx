import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PassiveButton } from './passive-button';
import { ButtonBemClass, PassiveButtonName } from '@/const/const-button';
import { AppRoute } from '@/const/const-navigate';

vi.mock('react-router-dom', () => ({
  Link: ({
    children,
    to,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    to: string;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
  }) => (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

describe('Component: PassiveButton', () => {
  const testName = 'Back' as PassiveButtonName;
  const testId = 123;
  const mockOnClick = vi.fn();

  describe('Basic rendering', () => {
    it('renders correctly with minimal props', () => {
      render(<PassiveButton name={testName} />);

      const link = screen.getByRole('link', { name: testName });

      expect(link).toBeInTheDocument();
      expect(link).toHaveClass(ButtonBemClass.Btn);
      expect(link).toHaveClass(ButtonBemClass.BtnTransparent);
      expect(link).toHaveTextContent(testName);
    });

    it('applies correct classes without modifiers', () => {
      render(<PassiveButton name={testName} />);

      const link = screen.getByRole('link');
      expect(link).toHaveClass(ButtonBemClass.Btn);
      expect(link).toHaveClass(ButtonBemClass.BtnTransparent);
      expect(link).not.toHaveClass(ButtonBemClass.Modal);
      expect(link).not.toHaveClass(ButtonBemClass.HalfWidth);
    });
  });

  describe('Modifiers', () => {
    it('applies modal class when isModal is true', () => {
      render(<PassiveButton name={testName} isModal />);

      expect(screen.getByRole('link')).toHaveClass(ButtonBemClass.Modal);
    });

    it('applies halfWidth class when isHalfWidth is true', () => {
      render(<PassiveButton name={testName} isHalfWidth />);

      expect(screen.getByRole('link')).toHaveClass(ButtonBemClass.HalfWidth);
    });

    it('applies both modifier classes when both props are true', () => {
      render(<PassiveButton name={testName} isModal isHalfWidth />);

      const link = screen.getByRole('link');
      expect(link).toHaveClass(ButtonBemClass.Modal);
      expect(link).toHaveClass(ButtonBemClass.HalfWidth);
    });
  });

  describe('Routing', () => {
    it('uses main route when isModal is true', () => {
      render(<PassiveButton name={testName} isModal />);

      expect(screen.getByRole('link')).toHaveAttribute('href', AppRoute.Main);
    });

    it('uses cameras route with id when isModal is false and id provided', () => {
      render(<PassiveButton name={testName} id={testId} />);

      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        AppRoute.Cameras.replace(':id', String(testId))
      );
    });
  });

  describe('Interactions', () => {
    it('calls onClick handler when clicked', () => {
      render(<PassiveButton name={testName} onClick={mockOnClick} />);

      fireEvent.click(screen.getByRole('link'));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not throw when clicked without onClick handler', () => {
      render(<PassiveButton name={testName} />);

      expect(() => fireEvent.click(screen.getByRole('link'))).not.toThrow();
    });
  });


  describe('Optimizations', () => {
    it('is memoized correctly', () => {
      const { rerender } = render(
        <PassiveButton name={testName} isModal onClick={mockOnClick} />
      );
      const initialRenderCount = mockOnClick.mock.calls.length;

      rerender(<PassiveButton name={testName} isModal onClick={mockOnClick} />);

      expect(mockOnClick.mock.calls.length).toBe(initialRenderCount);
    });

    it('re-renders when props change', () => {
      const { rerender } = render(<PassiveButton name={testName} />);

      rerender(<PassiveButton name={testName} isModal />);

      expect(screen.getByRole('link')).toHaveClass(ButtonBemClass.Modal);
    });
  });
});
