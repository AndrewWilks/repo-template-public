import assert from 'assert';
import { hasChangelog } from '../scripts/changelog-detect.mjs';

// Happy path
const body1 = `## Changelog
### Added
- Add new feature
`;
assert.strictEqual(hasChangelog(body1), true, 'should detect changelog with bullet');

// Heading present but no bullet
const body2 = `## Changelog
### Added
`;
assert.strictEqual(hasChangelog(body2), false, 'should fail when no bullet');

// Different heading style
const body3 = `### Changelog:
### Fixed
- Fix bug
`;
assert.strictEqual(hasChangelog(body3), true, 'should accept ### Changelog:');

// No heading
const body4 = `Some description
No changelog here
`;
assert.strictEqual(hasChangelog(body4), false, 'should fail with no changelog');

console.log('All changelog-detect tests passed');
