import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FooterInfo } from './footer-info';

vi.mock('../../header/logo', () => ({
  Logo: () => <div data-testid="logo" />,
}));
vi.mock('./footer-description', () => ({
  FooterDescription: () => <div data-testid="description" />,
}));
vi.mock('./social', () => ({
  Social: () => <div data-testid="social" />,
}));

describe('Component: FooterInfo', () => {
  it('should render correctly', () => {
    const infoContainerTestId = 'info-container';
    const logoTestId = 'logo';
    const descriptionTestId = 'description';
    const socialTestId = 'social';

    render(<FooterInfo />);

    const infoContainer = screen.getByTestId(infoContainerTestId);
    const logo = screen.getByTestId(logoTestId);
    const description = screen.getByTestId(descriptionTestId);
    const social = screen.getByTestId(socialTestId);

    expect(infoContainer).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(social).toBeInTheDocument();
  });
});
