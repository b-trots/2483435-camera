import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { Breadcrumbs } from './breadcrumbs';
import { AppRoute, BREADCRUMBS } from '@/const/const-navigate';
import { TitleName } from '@/const/const';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe('Component: Breadcrumbs', () => {
  const setup = (path: string, cameraName?: string) => {
    const mockedUseLocation = vi.mocked(useLocation);
    mockedUseLocation.mockReturnValue({
      pathname: path,
      search: '',
      hash: '',
      state: null,
      key: '',
    });

    render(
      <MemoryRouter initialEntries={[path]}>
        <Breadcrumbs cameraName={cameraName} />
      </MemoryRouter>
    );
  };

  it('should render breadcrumbs without camera name for catalog page', () => {
    setup(AppRoute.Main);

    const breadcrumbItems = [
      ...screen.getAllByTestId('bread'),
      ...screen.getAllByTestId('bread-active'),
    ];
    expect(breadcrumbItems).toHaveLength(BREADCRUMBS.length);

    BREADCRUMBS.forEach(({ name }) => {
      expect(screen.getByText(name.trim())).toBeInTheDocument();
    });
  });

  it('should render breadcrumbs with camera name for product page', () => {
    const cameraName = 'Test Camera';
    setup(AppRoute.Cameras.replace(':id', '1'), cameraName);

    const breadcrumbItems = [
      ...screen.getAllByTestId('bread'),
      ...screen.getAllByTestId('bread-active'),
    ];
    expect(breadcrumbItems).toHaveLength(BREADCRUMBS.length + 1);

    expect(screen.getByText(cameraName)).toBeInTheDocument();
  });

  it('should render breadcrumbs with basket title for basket page', () => {
    setup(AppRoute.Card);

    const breadcrumbItems = screen.getAllByRole('listitem');
    expect(breadcrumbItems).toHaveLength(BREADCRUMBS.length + 1);

    expect(screen.getByText(TitleName.Basket)).toBeInTheDocument();
  });

});
