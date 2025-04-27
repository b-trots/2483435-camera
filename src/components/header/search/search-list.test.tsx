import { render, screen, fireEvent } from '@testing-library/react';
import { SearchList } from './search-list';
import { vi } from 'vitest';
import { generateAllCameras } from '@/utils/mock/mock';

const mockCameras = generateAllCameras(5);

vi.mock('@/hooks/use-search/use-scroll-to-active-item', () => ({
  useScrollToActiveItem: vi.fn(),
}));

const mockSetActiveIndex = vi.fn();
const mockOnClick = vi.fn();

describe('Component: SearchList', () => {
  it('should render list of cameras when filteredCameras is not empty', () => {
    render(
      <SearchList
        filteredCameras={mockCameras}
        activeIndex={null}
        setActiveIndex={mockSetActiveIndex}
        onClick={mockOnClick}
      />
    );

    mockCameras.forEach((camera) => {
      expect(screen.getByText(camera.name)).toBeInTheDocument();
    });
  });

  it('should not render anything when filteredCameras is empty', () => {
    render(
      <SearchList
        filteredCameras={[]}
        activeIndex={null}
        setActiveIndex={mockSetActiveIndex}
        onClick={mockOnClick}
      />
    );

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should call onClick when a camera item is clicked', () => {
    render(
      <SearchList
        filteredCameras={mockCameras}
        activeIndex={null}
        setActiveIndex={mockSetActiveIndex}
        onClick={mockOnClick}
      />
    );

    fireEvent.click(screen.getByText(mockCameras[0].name));

    expect(mockOnClick).toHaveBeenCalledWith(mockCameras[0].id);
  });

  it('should call setActiveIndex when a camera item is hovered', () => {
    render(
      <SearchList
        filteredCameras={mockCameras}
        activeIndex={null}
        setActiveIndex={mockSetActiveIndex}
        onClick={mockOnClick}
      />
    );

    fireEvent.mouseEnter(screen.getByText(mockCameras[0].name));

    expect(mockSetActiveIndex).toHaveBeenCalledWith(0);
  });
});
