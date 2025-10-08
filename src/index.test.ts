/**
 * Placeholder test file for src/index.ts
 * TODO: Replace with proper test framework (e.g., Vitest) later
 */

import { greet } from './index';

// Simple assertion-based test
function testGreet(): void {
  const result = greet('Test');
  const expected = 'Hello, Test!';
  
  if (result !== expected) {
    throw new Error(`Test failed: expected "${expected}", got "${result}"`);
  }
  
  console.log('✅ testGreet passed');
}

// Run tests if executed directly
if (require.main === module) {
  try {
    testGreet();
    console.log('All tests passed!');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}
