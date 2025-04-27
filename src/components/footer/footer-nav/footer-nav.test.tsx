import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FooterNav } from './footer-nav';
import { vi } from 'vitest';
import { FOOTER_NAVIGATE } from '@/const/const-navigate';

vi.mock('@/const/const-navigate', () => ({
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

describe('Component: FooterNav', () => {
  it('should render all sections from FOOTER_NAVIGATE', () => {
    render(
      <MemoryRouter>
        <FooterNav />
      </MemoryRouter>
    );

    FOOTER_NAVIGATE.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('should render correct number of links for each section', () => {
    render(
      <MemoryRouter>
        <FooterNav />
      </MemoryRouter>
    );

    const allLinks = FOOTER_NAVIGATE.reduce((acc, { navigate }) => {
      acc.push(...navigate);
      return acc;
    }, [] as { name: string; path: string }[]);


    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(allLinks.length);
  });

  it('should render correct link texts and paths', () => {
    render(
      <MemoryRouter>
        <FooterNav />
      </MemoryRouter>
    );


    FOOTER_NAVIGATE.forEach(({ navigate }) => {
      navigate.forEach(({ name, path }) => {
        const link = screen.getByText(name);
        expect(link).toHaveAttribute('href', path);
      });
    });
  });
});
