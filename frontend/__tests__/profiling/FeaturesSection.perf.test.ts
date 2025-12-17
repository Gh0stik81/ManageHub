import { measureObjectCreation } from '../../utils/profiling';

describe('FeaturesSection Performance Profiling', () => {
  
  describe('Object Creation Overhead', () => {
    
    it('should measure inline vs cached icon object creation', () => {
      const iterations = 10000;
      const results = measureObjectCreation(iterations);
      
      console.log(`\nIcon Object Creation (${iterations} iterations)`);
      console.log(`  Inline: ${results.inlineCreation.toFixed(3)} ms`);
      console.log(`  Cached: ${results.cachedReference.toFixed(3)} ms`);
      console.log(`  Improvement: ${results.improvement}\n`);
      
      expect(results.cachedReference).toBeLessThanOrEqual(results.inlineCreation);
    });

    it('should simulate React re-render overhead with inline JSX', () => {
      const rerenderCount = 100;
      
      // BEFORE: inline icon creation per render
      const beforeStart = performance.now();
      for (let render = 0; render < rerenderCount; render++) {
        const features = [
          { icon: createMockIcon('Users'), title: 'Smart User Management' },
          { icon: createMockIcon('Shield'), title: 'Biometric Security' },
          { icon: createMockIcon('BarChart3'), title: 'Real-time Analytics' },
          { icon: createMockIcon('Smartphone'), title: 'Mobile-First Design' },
          { icon: createMockIcon('Zap'), title: 'Automated Billing' },
          { icon: createMockIcon('Globe'), title: 'Blockchain Integration' },
        ];
        features.forEach(f => processFeature(f));
      }
      const beforeTime = performance.now() - beforeStart;
      
      // AFTER: cached icon references
      const cachedFeatures = [
        { IconComponent: 'Users', title: 'Smart User Management' },
        { IconComponent: 'Shield', title: 'Biometric Security' },
        { IconComponent: 'BarChart3', title: 'Real-time Analytics' },
        { IconComponent: 'Smartphone', title: 'Mobile-First Design' },
        { IconComponent: 'Zap', title: 'Automated Billing' },
        { IconComponent: 'Globe', title: 'Blockchain Integration' },
      ];
      
      const afterStart = performance.now();
      for (let render = 0; render < rerenderCount; render++) {
        cachedFeatures.forEach(f => processFeatureOptimized(f));
      }
      const afterTime = performance.now() - afterStart;
      
      const improvement = ((beforeTime - afterTime) / beforeTime * 100);
      
      console.log(`\nRe-render Simulation (${rerenderCount} renders)`);
      console.log(`  BEFORE (inline JSX): ${beforeTime.toFixed(3)} ms`);
      console.log(`  AFTER (cached refs): ${afterTime.toFixed(3)} ms`);
      console.log(`  Improvement: ${improvement.toFixed(1)}%\n`);
      
      expect(afterTime).toBeLessThanOrEqual(beforeTime);
    });
  });
});

function createMockIcon(name: string) {
  return {
    type: name,
    props: { className: 'h-6 w-6' },
    key: null,
    ref: null,
  };
}

function processFeature(feature: { icon: unknown; title: string }) {
  return { ...feature, rendered: true };
}

function processFeatureOptimized(feature: { IconComponent: string; title: string }) {
  return { ...feature, rendered: true };
}
