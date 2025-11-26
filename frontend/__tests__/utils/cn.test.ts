import { cn } from '@/utils/cn';

describe('cn (className utility)', () => {
  describe('basic functionality', () => {
    it('should merge simple class names', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle single class name', () => {
      const result = cn('single-class');
      expect(result).toBe('single-class');
    });

    it('should return empty string for no arguments', () => {
      const result = cn();
      expect(result).toBe('');
    });
  });

  describe('conditional classes', () => {
    it('should handle conditional classes with objects', () => {
      const result = cn('base', { 'active': true, 'disabled': false });
      expect(result).toContain('base');
      expect(result).toContain('active');
      expect(result).not.toContain('disabled');
    });

    it('should handle falsy values', () => {
      const result = cn('base', null, undefined, false, '');
      expect(result).toBe('base');
    });

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2']);
      expect(result).toContain('class1');
      expect(result).toContain('class2');
    });
  });

  describe('tailwind merge functionality', () => {
    it('should merge conflicting tailwind classes', () => {
      const result = cn('px-2', 'px-4');
      expect(result).toBe('px-4');
    });

    it('should merge conflicting margin classes', () => {
      const result = cn('mt-2', 'mt-4');
      expect(result).toBe('mt-4');
    });

    it('should merge conflicting text color classes', () => {
      const result = cn('text-red-500', 'text-blue-500');
      expect(result).toBe('text-blue-500');
    });

    it('should preserve non-conflicting tailwind classes', () => {
      const result = cn('px-4', 'py-2', 'mt-2');
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).toContain('mt-2');
    });

    it('should handle complex tailwind conflicts', () => {
      const result = cn(
        'bg-white hover:bg-gray-100',
        'bg-blue-500'
      );
      expect(result).toContain('bg-blue-500');
      expect(result).toContain('hover:bg-gray-100');
      expect(result).not.toContain('bg-white');
    });
  });

  describe('real-world usage patterns', () => {
    it('should handle button variant pattern', () => {
      const variant = 'primary';
      const result = cn(
        'btn',
        {
          'btn-primary': variant === 'primary',
          'btn-secondary': variant === 'secondary',
        }
      );
      expect(result).toContain('btn');
      expect(result).toContain('btn-primary');
      expect(result).not.toContain('btn-secondary');
    });

    it('should handle responsive classes pattern', () => {
      const result = cn('w-full', 'md:w-1/2', 'lg:w-1/3');
      expect(result).toContain('w-full');
      expect(result).toContain('md:w-1/2');
      expect(result).toContain('lg:w-1/3');
    });

    it('should handle component composition pattern', () => {
      const baseClasses = 'rounded-lg border';
      const customClasses = 'p-4 shadow-lg';
      const result = cn(baseClasses, customClasses);
      expect(result).toContain('rounded-lg');
      expect(result).toContain('border');
      expect(result).toContain('p-4');
      expect(result).toContain('shadow-lg');
    });
  });
});
