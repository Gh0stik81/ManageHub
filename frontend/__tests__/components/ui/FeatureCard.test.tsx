import React from 'react';
import { render, screen } from '@testing-library/react';
import FeatureCard from '@/components/ui/FeatureCard';
import { Star } from 'lucide-react';

describe('FeatureCard', () => {
  it('should render title', () => {
    render(
      <FeatureCard 
        title="Feature Title" 
        description="Feature description" 
        icon={Star} 
      />
    );
    expect(screen.getByText('Feature Title')).toBeInTheDocument();
  });

  it('should render description', () => {
    render(
      <FeatureCard 
        title="Title" 
        description="This is a detailed description" 
        icon={Star} 
      />
    );
    expect(screen.getByText('This is a detailed description')).toBeInTheDocument();
  });

  it('should render icon', () => {
    render(
      <FeatureCard 
        title="Title" 
        description="Description" 
        icon={Star} 
      />
    );
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <FeatureCard 
        title="Title" 
        description="Description" 
        icon={Star} 
        className="my-custom-class"
      />
    );
    expect(container.firstChild).toHaveClass('my-custom-class');
  });
});
