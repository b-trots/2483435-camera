import { render, screen } from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import { ToBlockActions } from './to-block-actions';

describe('Component: ToBlockActions', () => {
  it('should render with correct styles', () => {
    render(<ToBlockActions />);

    const divElement = screen.getByTestId('block-actions');

    expect(divElement).toHaveStyle({
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '1000',
      pointerEvents: 'all',
    });
  });
});
