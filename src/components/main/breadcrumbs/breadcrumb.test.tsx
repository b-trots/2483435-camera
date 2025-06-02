import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumb } from './breadcrumb';

vi.mock('react-router-dom', () => ({
  Link: ({
    children,
    to,
    className,
  }: {
    children: React.ReactNode;
    to: string;
    className?: string;
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

describe('Component: Breadcrumb', () => {
  const testName = 'Test Breadcrumb';
  const testPath = '/test-path';

  it('should render correctly with provided props', () => {
    render(<Breadcrumb name={testName} path={testPath} />);

    const breadcrumbItem = screen.getByTestId('bread');
    const linkElement = screen.getByRole('link');

    expect(breadcrumbItem).toBeInTheDocument();
    expect(breadcrumbItem).toHaveClass('breadcrumbs__item');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass('breadcrumbs__link');
    expect(linkElement).toHaveAttribute('href', testPath);
    expect(linkElement).toHaveTextContent(testName);
  });

  it('should display the correct name', () => {
    render(<Breadcrumb name={testName} path={testPath} />);
    expect(screen.getByText(testName)).toBeInTheDocument();
  });

  it('should have the correct path in the link', () => {
    render(<Breadcrumb name={testName} path={testPath} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', testPath);
  });
});
