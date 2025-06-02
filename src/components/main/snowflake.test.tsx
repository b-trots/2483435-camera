import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Snowflake } from './snowflake';
import { ServiceParam } from '@/const/const';

describe('Component: Snowflake', () => {
  it('renders without errors', () => {
    const { container } = render(<Snowflake />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('has correct dimensions from ServiceParam', () => {
    const { container } = render(<Snowflake />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', ServiceParam.SnowflakeSize.toString());
    expect(svg).toHaveAttribute(
      'height',
      ServiceParam.SnowflakeSize.toString()
    );
  });

  it('has aria-hidden attribute', () => {
    const { container } = render(<Snowflake />);
    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });
});
