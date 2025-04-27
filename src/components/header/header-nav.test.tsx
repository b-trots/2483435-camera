import { render, screen } from '@testing-library/react';
import { HeaderNav } from './header-nav';
import { NAVIGATE } from '@/const/const-navigate';
import { MemoryRouter } from 'react-router-dom';


vi.mock('@/const/const-navigate', () => ({
  NAVIGATE: [
    { name: 'Каталог', path: '/main' },
    { name: 'Гарантии', path: '/plug' },
    { name: 'Доставка', path: '/plug' },
    { name: 'О компании', path: '/plug' },
  ],
  AppRoute: {
    Main: '/main',
    Plug: '/plug',
  },
}));

describe('Component: HeaderNav', () => {
  it('should render all navigation links', () => {
    render(
      <MemoryRouter>
        <HeaderNav />
      </MemoryRouter>
    );


    NAVIGATE.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('should have correct key for each list item', () => {
    render(
      <MemoryRouter>
        <HeaderNav />
      </MemoryRouter>
    );


    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(NAVIGATE.length);
  });

  it('should render navigation list inside <nav>', () => {
    render(
      <MemoryRouter>
        <HeaderNav />
      </MemoryRouter>
    );


    const nav = screen.getByRole('navigation');
    expect(nav).toContainElement(screen.getByRole('list'));
    expect(screen.getByRole('list')).toHaveClass('main-nav__list');
  });
});
