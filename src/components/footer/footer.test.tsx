import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
import { vi } from 'vitest';

vi.mock('./footer-info/footer-info', () => ({
  FooterInfo: () => <div data-testid="footer-info" />,
}));

vi.mock('./footer-nav/footer-nav', () => ({
  FooterNav: () => <div data-testid="footer-nav" />,
}));

describe('Component: Footer', () => {
  it('should render FooterInfo and FooterNav components', () => {
    render(<Footer />);

    expect(screen.getByTestId('footer-info')).toBeInTheDocument();
    expect(screen.getByTestId('footer-nav')).toBeInTheDocument();
  });

  it('should render the footer element with correct className', () => {
    render(<Footer />);

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('footer');
  });

  it('should render container div inside footer', () => {
    render(<Footer />);

    const containerDiv = screen
      .getByTestId('footer')
      .querySelector('.container');
    expect(containerDiv).toBeInTheDocument();
  });
});
