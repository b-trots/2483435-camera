import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CloseButton } from './close-button';
import {
  ButtonBemClass,
  ButtonType,
  CloseButtonInfo,
} from '@/const/const-button';

describe('Component: CloseButton', () => {
  const mockOnClick = vi.fn();
  const mockRef = { current: null };

  describe('Common functionality', () => {

    it('calls onClick handler when clicked', () => {
      render(
        <CloseButton
          bemClass={ButtonBemClass.Cross}
          type={ButtonType.Button}
          onClick={mockOnClick}
        />
      );

      fireEvent.click(screen.getByRole('button'));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('accepts and uses ref correctly', () => {
      render(
        <CloseButton
          bemClass={ButtonBemClass.Cross}
          type={ButtonType.Button}
          lastTabRef={mockRef}
        />
      );

      expect(mockRef.current).toBe(screen.getByRole('button'));
    });
  });

  describe('Cross button variant', () => {
    it('renders with Cross class', () => {
      render(
        <CloseButton bemClass={ButtonBemClass.Cross} type={ButtonType.Button} />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass(ButtonBemClass.Cross);
      expect(button).not.toHaveClass(ButtonBemClass.FormSearchReset);
    });


    it('does not render hidden span', () => {
      render(
        <CloseButton bemClass={ButtonBemClass.Cross} type={ButtonType.Button} />
      );

      expect(
        screen.queryByText(CloseButtonInfo.ResetSearch)
      ).not.toBeInTheDocument();
    });
  });

  describe('FormSearchReset button variant', () => {
    it('renders with FormSearchReset class', () => {
      render(
        <CloseButton
          bemClass={ButtonBemClass.FormSearchReset}
          type={ButtonType.Reset}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass(ButtonBemClass.FormSearchReset);
      expect(button).not.toHaveClass(ButtonBemClass.Cross);
    });

    it('renders hidden span with reset text', () => {
      render(
        <CloseButton
          bemClass={ButtonBemClass.FormSearchReset}
          type={ButtonType.Reset}
        />
      );

      const span = screen.getByText(CloseButtonInfo.ResetSearch);
      expect(span).toBeInTheDocument();
      expect(span).toHaveClass('visually-hidden');
    });
  });

});
