import { render, screen } from '@testing-library/react';
import { FooterDescription } from './footer-description';

describe('Component: FooterDescription', () => {
  it('should render correctly', () => {
    const expectedText = /Интернет-магазин фото- и видеотехники/i;

    render(<FooterDescription />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
