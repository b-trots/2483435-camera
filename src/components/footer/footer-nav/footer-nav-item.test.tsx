import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FooterNavItem } from './footer-nav-item';
import { vi } from 'vitest';
import { FOOTER_NAVIGATE } from '@/const/const-navigate';


vi.mock('@/const/const-navigate', () => ({
  NAVIGATE: [
    { name: 'Каталог', path: '/main' },
    { name: 'Гарантии', path: '/plug' },
    { name: 'Доставка', path: '/plug' },
    { name: 'О компании', path: '/plug' },
  ],
  RESOURCES: [
    { name: 'Курсы операторов', path: '/plug' },
    { name: 'Блог', path: '/plug' },
    { name: 'Сообщество', path: '/plug' },
  ],
  SUPPORT: [
    { name: 'FAQ', path: '/plug' },
    { name: 'Задать вопрос', path: '/plug' },
  ],
  FOOTER_NAVIGATE: [
    {
      title: 'Навигация',
      navigate: [
        { name: 'Каталог', path: '/main' },
        { name: 'Гарантии', path: '/plug' },
        { name: 'Доставка', path: '/plug' },
        { name: 'О компании', path: '/plug' },
      ] as const,
    },
    {
      title: 'Ресурсы',
      navigate: [
        { name: 'Курсы операторов', path: '/plug' },
        { name: 'Блог', path: '/plug' },
        { name: 'Сообщество', path: '/plug' },
      ] as const,
    },
    {
      title: 'Поддержка',
      navigate: [
        { name: 'FAQ', path: '/plug' },
        { name: 'Задать вопрос', path: '/plug' },
      ] as const,
    },
  ] as const,
}));

describe('Component: FooterNavItem', () => {
  it('should render title and links correctly', () => {
    const mockItem = FOOTER_NAVIGATE[0];

    render(
      <MemoryRouter>
        <FooterNavItem title={mockItem.title} navigate={mockItem.navigate} />
      </MemoryRouter>
    );


    expect(screen.getByText(mockItem.title)).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockItem.navigate.length);

    mockItem.navigate.forEach(({ name, path }, index) => {
      expect(links[index]).toHaveTextContent(name);
      expect(links[index]).toHaveAttribute('href', path);
    });
  });
});
