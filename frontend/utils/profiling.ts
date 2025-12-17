export interface ProfileResult {
  componentName: string;
  renderCount: number;
  averageRenderTime: number;
  totalRenderTime: number;
  timestamp: string;
}

const profileData: Map<string, { times: number[]; count: number }> = new Map();

// Start profiling a component render
export function startProfile(componentName: string): () => void {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    const existing = profileData.get(componentName) || { times: [], count: 0 };
    existing.times.push(renderTime);
    existing.count++;
    profileData.set(componentName, existing);
  };
}

// Get profile results for a component
export function getProfileResults(componentName: string): ProfileResult | null {
  const data = profileData.get(componentName);
  if (!data || data.times.length === 0) return null;
  
  const totalTime = data.times.reduce((a, b) => a + b, 0);
  
  return {
    componentName,
    renderCount: data.count,
    averageRenderTime: totalTime / data.times.length,
    totalRenderTime: totalTime,
    timestamp: new Date().toISOString(),
  };
}

// Get all profile results
export function getAllProfileResults(): ProfileResult[] {
  const results: ProfileResult[] = [];
  
  profileData.forEach((data, name) => {
    const result = getProfileResults(name);
    if (result) results.push(result);
  });
  
  return results;
}

// Clear profile data
export function clearProfileData(): void {
  profileData.clear();
}

// Log profile results to console
export function logProfileResults(): void {
  const results = getAllProfileResults();
  
  console.log('\n=== PROFILING RESULTS ===');
  console.table(results.map(r => ({
    Component: r.componentName,
    'Render Count': r.renderCount,
    'Avg Time (ms)': r.averageRenderTime.toFixed(3),
    'Total Time (ms)': r.totalRenderTime.toFixed(3),
  })));
  console.log('========================\n');
}

// Measure object creation overhead
export function measureObjectCreation(iterations: number = 1000): {
  inlineCreation: number;
  cachedReference: number;
  improvement: string;
} {
  // Inline icon creation (new object every time)
  const startInline = performance.now();
  for (let i = 0; i < iterations; i++) {
    const icons = [
      { icon: { type: 'Users', props: { className: 'h-6 w-6' } } },
      { icon: { type: 'Shield', props: { className: 'h-6 w-6' } } },
      { icon: { type: 'BarChart3', props: { className: 'h-6 w-6' } } },
      { icon: { type: 'Smartphone', props: { className: 'h-6 w-6' } } },
      { icon: { type: 'Zap', props: { className: 'h-6 w-6' } } },
      { icon: { type: 'Globe', props: { className: 'h-6 w-6' } } },
    ];
    void icons;
  }
  const inlineTime = performance.now() - startInline;

  // Cached reference (same object reused)
  const cachedIcons = [
    { icon: { type: 'Users', props: { className: 'h-6 w-6' } } },
    { icon: { type: 'Shield', props: { className: 'h-6 w-6' } } },
    { icon: { type: 'BarChart3', props: { className: 'h-6 w-6' } } },
    { icon: { type: 'Smartphone', props: { className: 'h-6 w-6' } } },
    { icon: { type: 'Zap', props: { className: 'h-6 w-6' } } },
    { icon: { type: 'Globe', props: { className: 'h-6 w-6' } } },
  ];
  
  const startCached = performance.now();
  for (let i = 0; i < iterations; i++) {
    const icons = cachedIcons;
    void icons;
  }
  const cachedTime = performance.now() - startCached;

  const improvement = ((inlineTime - cachedTime) / inlineTime * 100).toFixed(1);

  return {
    inlineCreation: inlineTime,
    cachedReference: cachedTime,
    improvement: `${improvement}%`,
  };
}
