import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ItemList } from './item-list';

describe('Component: ItemList', () => {
  it('renders without errors', () => {
    render(<ItemList title="Test Title" value="Test Value" />);
    expect(screen.getByText('Test Title:')).toBeInTheDocument();
  });

  it('correctly displays passed props', () => {
    render(<ItemList title="Price" value={1000} />);

    expect(screen.getByText('Price:')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
  });

  it('correctly displays number as value', () => {
    render(<ItemList title="Rating" value={4.5} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('correctly displays string as value', () => {
    render(<ItemList title="Category" value="Camera" />);
    expect(screen.getByText('Camera')).toBeInTheDocument();
  });
});
