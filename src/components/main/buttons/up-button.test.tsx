import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UpButton } from './up-button';

vi.mock('react-router-dom', () => ({
  Link: ({
    children,
    to,
    onClick,
  }: {
    children: React.ReactNode;
    to: string;
    onClick: (e: React.MouseEvent) => void;
  }) => (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  ),
}));


describe('Component: UpButton', () => {
  it('should render correctly', () => {
    render(<UpButton />);

    const upButton = screen.getByRole('link');
    const svg = screen.getByTestId('up-button-svg');

    expect(upButton).toBeInTheDocument();
    expect(upButton).toHaveAttribute('href', '#header');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

});
