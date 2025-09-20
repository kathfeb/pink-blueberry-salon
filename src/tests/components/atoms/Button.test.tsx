/**
 * @Description: Test for Button component.
 */

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SizesRecord, VariantsRecord } from '../../../components/atoms/Button/types';
import { Button } from '../../../components/atoms/Button';

describe('Button', () => {
  Object.keys(VariantsRecord).forEach((variant) => {
    it(`Component should render a button with a label and a variant ${variant} `, () => {
      render(<Button variant={variant as keyof typeof VariantsRecord}>test</Button>);
      expect(screen.getByText('test')).toBeTruthy();
    });
  });

  Object.keys(SizesRecord).forEach((size) => {
    it(`Component should render a button with a label and a size ${size} `, () => {
      render(<Button size={size as keyof typeof SizesRecord}>test</Button>);
      expect(screen.getByText('test')).toBeTruthy();
    });
  });

  it('Component should call onClick function ', () => {
    const onClick = vi.fn();
    const { container } = render(<Button onClick={onClick}>test</Button>);
    container.querySelector('button')?.click();
    expect(onClick).toHaveBeenCalled();
  });

  it('Component should render a disabled button ', () => {
    render(<Button disabled>test</Button>);
    expect(screen.getByText('test')).toBeDisabled();
  });
});
