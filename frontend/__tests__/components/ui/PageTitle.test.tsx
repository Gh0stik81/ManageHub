import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageTitle } from '@/components/ui/PageTitle';

describe('PageTitle', () => {
  it('should render title', () => {
    render(<PageTitle title="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should render title as h1', () => {
    render(<PageTitle title="Settings" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Settings');
  });

  it('should render subtitle when provided', () => {
    render(<PageTitle title="Users" subtitle="Manage your team members" />);
    expect(screen.getByText('Manage your team members')).toBeInTheDocument();
  });

  it('should not render subtitle when not provided', () => {
    render(<PageTitle title="Profile" />);
    const subtitle = screen.queryByText(/./i, { selector: 'p' });
    expect(subtitle).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<PageTitle title="Test" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
