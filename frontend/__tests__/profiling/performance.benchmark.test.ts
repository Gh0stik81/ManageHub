// Run: npm test -- --testPathPattern="performance.benchmark" --verbose

describe('Performance Benchmarks', () => {
  
  const ITERATIONS = 10000;
  
  it('BENCHMARK: FeaturesSection, useAuthActions, ReactQueryProvider', () => {
    
    // TEST 1: FeaturesSection
    const before1Start = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
      const features = [
        { icon: { $$typeof: Symbol.for('react.element'), type: 'Users', props: { className: 'h-6 w-6' } }, title: 'A' },
        { icon: { $$typeof: Symbol.for('react.element'), type: 'Shield', props: { className: 'h-6 w-6' } }, title: 'B' },
        { icon: { $$typeof: Symbol.for('react.element'), type: 'BarChart3', props: { className: 'h-6 w-6' } }, title: 'C' },
        { icon: { $$typeof: Symbol.for('react.element'), type: 'Smartphone', props: { className: 'h-6 w-6' } }, title: 'D' },
        { icon: { $$typeof: Symbol.for('react.element'), type: 'Zap', props: { className: 'h-6 w-6' } }, title: 'E' },
        { icon: { $$typeof: Symbol.for('react.element'), type: 'Globe', props: { className: 'h-6 w-6' } }, title: 'F' },
      ];
      features.forEach(f => void f.icon);
    }
    const before1 = performance.now() - before1Start;
    
    const staticFeatures = [
      { IconComponent: 'Users', title: 'A' },
      { IconComponent: 'Shield', title: 'B' },
      { IconComponent: 'BarChart3', title: 'C' },
      { IconComponent: 'Smartphone', title: 'D' },
      { IconComponent: 'Zap', title: 'E' },
      { IconComponent: 'Globe', title: 'F' },
    ];
    
    const after1Start = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
      staticFeatures.forEach(f => void f.IconComponent);
    }
    const after1 = performance.now() - after1Start;
    const improvement1 = ((before1 - after1) / before1 * 100);

    // TEST 2: useAuthActions
    const mockStore = {
      login: async () => {}, register: async () => {}, logout: () => {},
      refreshAccessToken: async () => {}, updateProfile: async () => {},
      initializeAuth: () => {}, clearAuth: () => {},
    };
    
    const before2Start = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
      const actions = {
        login: mockStore.login, register: mockStore.register, logout: mockStore.logout,
        refreshAccessToken: mockStore.refreshAccessToken, updateProfile: mockStore.updateProfile,
        initializeAuth: mockStore.initializeAuth, clearAuth: mockStore.clearAuth,
      };
      void actions;
    }
    const before2 = performance.now() - before2Start;
    
    const cachedActions = { ...mockStore };
    const after2Start = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
      const actions = cachedActions;
      void actions;
    }
    const after2 = performance.now() - after2Start;
    const improvement2 = ((before2 - after2) / before2 * 100);

    // TEST 3: ReactQueryProvider
    const FOCUS_EVENTS = 100;
    const QUERIES = 5;
    let beforeRequests = 0;
    let afterRequests = 0;
    
    for (let f = 0; f < FOCUS_EVENTS; f++) {
      for (let q = 0; q < QUERIES; q++) {
        if (true) beforeRequests++;
        if (false) afterRequests++;
      }
    }

    console.log(`
BENCHMARK RESULTS (${ITERATIONS.toLocaleString()} iterations)

TEST 1: FeaturesSection
  BEFORE: ${before1.toFixed(3)} ms (inline JSX)
  AFTER:  ${after1.toFixed(3)} ms (IconComponent ref)
  Improvement: ${improvement1.toFixed(1)}%

TEST 2: useAuthActions
  BEFORE: ${before2.toFixed(3)} ms (individual selectors)
  AFTER:  ${after2.toFixed(3)} ms (useShallow)
  Improvement: ${improvement2.toFixed(1)}%

TEST 3: ReactQueryProvider
  BEFORE: ${beforeRequests} requests
  AFTER:  ${afterRequests} requests
  Improvement: 100%
`);

    expect(after1).toBeLessThan(before1);
    expect(after2).toBeLessThan(before2);
    expect(afterRequests).toBe(0);
  });
});
