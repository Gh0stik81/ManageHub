import React from 'react';
import { render, screen } from '@testing-library/react';
import { TimePill } from '@/components/ui/TimePill';

describe('TimePill', () => {
  it('should render label', () => {
    render(<TimePill label="Days" value={5} />);
    expect(screen.getByText('Days')).toBeInTheDocument();
  });

  it('should render value', () => {
    render(<TimePill label="Hours" value={12} />);
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('should pad single digit with zero', () => {
    render(<TimePill label="Minutes" value={5} />);
    expect(screen.getByText('05')).toBeInTheDocument();
  });

  it('should not pad double digit', () => {
    render(<TimePill label="Seconds" value={45} />);
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('should render zero as 00', () => {
    render(<TimePill label="Days" value={0} />);
    expect(screen.getByText('00')).toBeInTheDocument();
  });
});
