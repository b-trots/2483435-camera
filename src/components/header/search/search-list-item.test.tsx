import { render, screen, fireEvent } from '@testing-library/react';
import { SearchListItem } from './search-list-item';
import { vi } from 'vitest';
import { generateCamera } from '@/utils/mock/mock';

const mockCamera = generateCamera();

const mockOnClick = vi.fn();
const mockOnHover = vi.fn();
const mockOnLeave = vi.fn();

describe('Component: SearchListItem', () => {
  it('should render camera name correctly', () => {
    render(
      <SearchListItem
        camera={mockCamera}
        index={0}
        activeIndex={null}
        onClick={mockOnClick}
        onHover={mockOnHover}
        onLeave={mockOnLeave}
      />
    );

    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
  });

  it('should have active class when index is equal to activeIndex', () => {
    render(
      <SearchListItem
        camera={mockCamera}
        index={0}
        activeIndex={0}
        onClick={mockOnClick}
        onHover={mockOnHover}
        onLeave={mockOnLeave}
      />
    );

    const listItem = screen.getByText(mockCamera.name).closest('li');
    expect(listItem).toHaveClass('form-search__select-item--active');
  });

  it('should call onClick when item is clicked', () => {
    render(
      <SearchListItem
        camera={mockCamera}
        index={0}
        activeIndex={null}
        onClick={mockOnClick}
        onHover={mockOnHover}
        onLeave={mockOnLeave}
      />
    );


    fireEvent.click(screen.getByText(mockCamera.name));


    expect(mockOnClick).toHaveBeenCalledWith(mockCamera.id);
  });

  it('should call onHover when item is hovered', () => {
    render(
      <SearchListItem
        camera={mockCamera}
        index={0}
        activeIndex={null}
        onClick={mockOnClick}
        onHover={mockOnHover}
        onLeave={mockOnLeave}
      />
    );


    fireEvent.mouseEnter(screen.getByText(mockCamera.name));


    expect(mockOnHover).toHaveBeenCalledWith(0);
  });

  it('should call onLeave when mouse leaves the item', () => {
    render(
      <SearchListItem
        camera={mockCamera}
        index={0}
        activeIndex={null}
        onClick={mockOnClick}
        onHover={mockOnHover}
        onLeave={mockOnLeave}
      />
    );


    fireEvent.mouseLeave(screen.getByText(mockCamera.name));


    expect(mockOnLeave).toHaveBeenCalled();
  });
});
