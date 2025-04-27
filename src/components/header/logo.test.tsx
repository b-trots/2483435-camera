import { render, screen } from '@testing-library/react';
import { Logo } from './logo';
import { vi } from 'vitest';
import { AppRoute } from '@/const/const-navigate';
import { BemClass, LogoParam } from '@/const/const';
import { LinkProps } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  Link: vi.fn(({ to, children, ...props }: LinkProps) => (
    <a href={to as string} {...props}>
      {children}
    </a>
  )),
}));

describe('Component: Logo', () => {
  it('should render the logo with correct link and aria-label', () => {
    render(<Logo bemBlock={BemClass.Header} />);

    const logoLink = screen.getByRole('link');

    expect(logoLink).toHaveAttribute('href', AppRoute.Main);

    expect(logoLink).toHaveAttribute('aria-label', LogoParam.Name as string);
  });

  it('should have the correct class based on bemBlock prop', () => {
    render(<Logo bemBlock={BemClass.Header} />);

    const logoLink = screen.getByRole('link');

    expect(logoLink).toHaveClass(`${BemClass.Header}__logo`);
  });
});
