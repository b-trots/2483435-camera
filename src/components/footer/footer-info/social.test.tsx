import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Social } from './social';

describe('Component: Social', () => {
  it('should render social links with correct labels and paths', () => {
    render(
      <MemoryRouter>
        <Social />
      </MemoryRouter>
    );

    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks).toHaveLength(3);

    const labels = socialLinks.map((link) => link.getAttribute('aria-label'));
    expect(labels).toEqual([
      'Переход на страницу вконтакте',
      'Переход на страницу pinterest',
      'Переход на страницу reddit',
    ]);
  });
});
