/* global describe, test, expect */
import genDiff from '../src/index.js';

describe('genDiff', () => {
  test('should return the correct diff for nested JSON files', () => {
    const filepath1 = './__fixtures__/file1.json';
    const filepath2 = './__fixtures__/file2.json';
    const expected = `{
      common: {
        + follow: false
        setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
        + setting5: {
            key5: value5
          }
        + setting6: {
            doge: {
                - wow: 
                + wow: so much
              }
            key: value
            + ops: vops
          }
      }
      group1: {
        - baz: bas
        + baz: bars
        foo: bar
        - nest: {
            key: value
          }
        + nest: str
      }
      - group2: {
          abc: 12345
          deep: {
              id: 45
            }
        }
      + group3: {
          deep: {
              id: {
                  number: 45
                }
            }
          fee: 100500
        }
    }`;

    expect(genDiff(filepath1, filepath2).trim()).toEqual(expected.trim());
  });
});
