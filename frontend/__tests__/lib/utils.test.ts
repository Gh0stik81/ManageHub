import { cn } from '@/lib/utils';

describe('cn (lib/utils)', () => {
  it('should merge class names', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('should handle empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle conditional classes', () => {
    const result = cn('base', { active: true, disabled: false });
    expect(result).toContain('base');
    expect(result).toContain('active');
    expect(result).not.toContain('disabled');
  });

  it('should merge tailwind conflicts', () => {
    const result = cn('px-2', 'px-4');
    expect(result).toBe('px-4');
  });
});
