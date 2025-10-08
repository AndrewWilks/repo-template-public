/**
 * Sample entry point for repo-template-public
 * This is a minimal TypeScript module that demonstrates the project structure.
 */

export function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Run when executed directly
if (require.main === module) {
  console.log(greet('World'));
  console.log('✅ repo-template-public is running successfully!');
}
