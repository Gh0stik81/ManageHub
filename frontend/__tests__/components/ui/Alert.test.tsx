import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from '@/components/ui/Alert';

describe('Alert', () => {
  it('should render title', () => {
    render(<Alert title="Warning" />);
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });

  it('should render children', () => {
    render(<Alert>This is alert content</Alert>);
    expect(screen.getByText('This is alert content')).toBeInTheDocument();
  });

  it('should render title and children together', () => {
    render(<Alert title="Info">Please read this message</Alert>);
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Please read this message')).toBeInTheDocument();
  });

  it('should render icon when provided', () => {
    const TestIcon = () => <span data-testid="test-icon">!</span>;
    render(<Alert icon={<TestIcon />} title="Alert" />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should render without icon', () => {
    render(<Alert title="No icon alert" />);
    expect(screen.getByText('No icon alert')).toBeInTheDocument();
  });
});
