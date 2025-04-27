import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoute } from '@/const/const-navigate';
import { BannerParam } from '@/const/const';
import { generateCamera } from '@/utils/mock/mock';
import { PassiveButtonName } from '@/const/const-button';
import { BannerItem } from './banner-item';

const mockCamera = generateCamera();

describe('Component: BannerItem', () => {
  it('should render the banner with correct image and text', () => {
    render(
      <MemoryRouter>
        <BannerItem camera={mockCamera} />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockCamera.previewImg);
    expect(img).toHaveAttribute('srcSet', mockCamera.previewImg2x);
    expect(img).toHaveAttribute('alt', BannerParam.Alt);

    expect(screen.getByText(BannerParam.Message)).toBeInTheDocument();
    expect(screen.getByText(mockCamera.name)).toBeInTheDocument();
    expect(screen.getByText(BannerParam.Text)).toBeInTheDocument();
  });

  it('should have the correct link with the right path', () => {
    render(
      <MemoryRouter>
        <BannerItem camera={mockCamera} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute(
      'href',
      AppRoute.Cameras.replace(':id', String(mockCamera.id))
    );
    expect(link).toHaveTextContent(PassiveButtonName.Details);
  });
});
