import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BreadcrumbActive } from './breadcrumb-active';

describe('Component: BreadcrumbActive', () => {
  const testName = 'Active Breadcrumb';

  it('should render correctly with provided props', () => {
    render(<BreadcrumbActive name={testName} />);

    const breadcrumbItem = screen.getByTestId('bread-active');
    const spanElement = screen.getByText(testName).closest('span');

    expect(breadcrumbItem).toBeInTheDocument();
    expect(breadcrumbItem).toHaveClass('breadcrumbs__item');

    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveClass('breadcrumbs__link');
    expect(spanElement).toHaveClass('breadcrumbs__link--active');
    expect(spanElement).toHaveTextContent(testName);
  });

  it('should display the correct name', () => {
    render(<BreadcrumbActive name={testName} />);
    expect(screen.getByText(testName)).toBeInTheDocument();
  });

  it('should have active modifier class', () => {
    render(<BreadcrumbActive name={testName} />);
    const spanElement = screen.getByText(testName).closest('span');
    expect(spanElement).toHaveClass('breadcrumbs__link--active');
  });

  it('should not contain a link', () => {
    render(<BreadcrumbActive name={testName} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
