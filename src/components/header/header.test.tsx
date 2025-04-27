import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { vi } from 'vitest';

vi.mock('./logo', () => ({
  Logo: vi.fn(() => <div>Logo</div>),
}));
vi.mock('./header-nav', () => ({
  HeaderNav: vi.fn(() => <div>HeaderNav</div>),
}));
vi.mock('./search/search', () => ({
  Search: vi.fn(() => <div>Search</div>),
}));

describe('Component: Header', () => {
  it('should render the Header component with all child components', () => {
    render(<Header />);


    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('HeaderNav')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should render the header with the correct class', () => {
    render(<Header />);


    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('header');
  });

  it('should render container inside header', () => {
    render(<Header />);

    const containerElement = screen.getByText('Logo').parentElement;
    expect(containerElement).toHaveClass('container');
  });
});
