import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { vi } from 'vitest';
import { withBrowserRouter, withStore } from '@/utils/mock/mock-component';

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
    const { withStoreComponent } = withStore(<Header />, {
      ORDER: { basket: [] },
    });
    const preparedComponent = withBrowserRouter(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('HeaderNav')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();

    const basketLink = screen.getByTestId('basket-link');
    expect(basketLink).toBeInTheDocument();
    expect(basketLink.querySelector('svg')).toBeInTheDocument();
  });

  it('should not to display the quantity of goods when the basket is empty', () => {
    const { withStoreComponent } = withStore(<Header />, {
      ORDER: {
        basket: [],
      },
    });
    const preparedComponent = withBrowserRouter(withStoreComponent);
    render(preparedComponent);

    const basketCount = screen.queryByTestId('basket-count');
    expect(basketCount).toBeNull();
  });

  it('should render correct number of items in the cart should be displayed', () => {
    const { withStoreComponent } = withStore(<Header />, {
      ORDER: {
        basket: [
          { id: 1, quantity: 5 },
          { id: 2, quantity: 3 },
          { id: 3, quantity: 7 },
          { id: 4, quantity: 2 },
        ],
      },
    });
    const preparedComponent = withBrowserRouter(withStoreComponent);
    render(preparedComponent);

    const basketCount = screen.getByTestId('basket-count');
    expect(basketCount).toBeInTheDocument();
    expect(screen.getByText('17')).toBeInTheDocument();
  });
});
