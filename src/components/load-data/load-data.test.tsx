import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { RequestCategory } from '@/const/const';
import { LoadData, LoadDataParam } from './load-data';

describe('LoadData Component', () => {
  it('renders loading message', () => {
    render(
      <LoadData
        requestCategory={RequestCategory.Cameras}
        loading
        error={false}
      />
    );

    const loadingMessage = screen.getByText(
      LoadDataParam[RequestCategory.Cameras].loading
    );
    expect(loadingMessage).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <LoadData
        requestCategory={RequestCategory.Cameras}
        loading={false}
        error
      />
    );

    const errorMessage = screen.getByText(
      LoadDataParam[RequestCategory.Cameras].error
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders nothing if neither loading nor error', () => {
    render(
      <LoadData
        requestCategory={RequestCategory.Cameras}
        loading={false}
        error={false}
      />
    );

    const loadingMessage = screen.queryByText(
      LoadDataParam[RequestCategory.Cameras].loading
    );
    const errorMessage = screen.queryByText(
      LoadDataParam[RequestCategory.Cameras].error
    );

    expect(loadingMessage).not.toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
  });
});
