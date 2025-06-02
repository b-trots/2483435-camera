import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { List } from './list';
import { BemClass } from '@/const/const';

describe('Component: List', () => {
  const mockDetails = [
    { title: 'Price', value: 1000 },
    { title: 'Rating', value: 4.5 },
    { title: 'Category', value: 'Camera' },
  ];

  it('renders without errors', () => {
    render(<List bemClass={BemClass.ProductCard} listDetails={mockDetails} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('correctly renders all list items', () => {
    render(<List bemClass={BemClass.ProductCard} listDetails={mockDetails} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(mockDetails.length);
  });

  it('applies correct class for ReviewCard', () => {
    render(<List bemClass={BemClass.ReviewCard} listDetails={mockDetails} />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass(`${BemClass.ReviewCard}__list`);
  });

  it('renders correct titles and values', () => {
    render(<List bemClass={BemClass.ProductCard} listDetails={mockDetails} />);
    mockDetails.forEach((detail) => {
      expect(screen.getByText(`${detail.title}:`)).toBeInTheDocument();
      expect(screen.getByText(detail.value.toString())).toBeInTheDocument();
    });
  });
});
