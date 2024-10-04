import { genDiff } from '../src/index.js';

describe('genDiff', () => {
  it('should compare two YAML files', () => {
    const result = genDiff('fixtures/file1.yml', 'fixtures/file2.yml');
    const expected = `
{
  - follow: false
  + follow: true
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
    expect(result.trim()).toBe(expected.trim());
  });
});
