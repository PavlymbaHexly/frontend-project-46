import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { mergeKeys, indent, genDiff } from '../src/index.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Изменяем пути на директорию __fixtures__
const file1Path = path.resolve(__dirname, '../__fixtures__/file1.json');
const file2Path = path.resolve(__dirname, '../__fixtures__/file2.json');

describe('mergeKeys', () => {
  const cases = [
    { keys1: ['a', 'b', 'c'], keys2: ['b', 'c', 'd', 'e'], expected: ['a', 'b', 'c', 'd', 'e'] },
    { keys1: [], keys2: ['a', 'b'], expected: ['a', 'b'] },
    { keys1: ['a', 'b'], keys2: [], expected: ['a', 'b'] },
    { keys1: [], keys2: [], expected: [] },
    { keys1: ['a', 'b'], keys2: ['b', 'c', 'd'], expected: ['a', 'b', 'c', 'd'] },
  ];

  cases.forEach(({ keys1, keys2, expected }) => {
    it(`совмещает [${keys1}] и [${keys2}] в ${expected}`, () => {
      expect(mergeKeys(keys1, keys2)).toEqual(expected);
    });
  });
});

describe('indent', () => {
  const cases = [
    { level: 1, left: 0, i: 4, expected: '    ' },
    { level: 2, left: 0, i: 4, expected: '        ' },
    { level: 1, left: 2, i: 4, expected: '  ' },
    { level: 1, left: 0, i: 2, expected: '  ' },
    { level: 1, left: 1, i: 2, expected: ' ' },
    { level: 1, left: 10, i: 4, expected: '' },
  ];

  cases.forEach(({ level, left, i, expected }) => {
    it(`возвращает ${expected.length ? `"${expected}"` : 'пустую строку'} для indent(${level}, ${left}, ${i})`, () => {
      expect(indent(level, left, i)).toBe(expected);
    });
  });
});

describe('genDiff', () => {
  let logSpy;

  beforeEach(() => {
    // @ts-ignore
    logSpy = jest.spyOn(process.stdout, 'write').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  const cases = [
    {
      description: 'работает с пустыми файлами',
      obj1: {},
      obj2: {},
      expected: ['{\n', '}\n'],
    },
    {
      description: 'работает с простыми объектами',
      obj1: { a: 1, b: 2, c: 3 },
      obj2: { a: 1, b: 3, d: 5 },
      expected: [
        '{\n', '    a: 1\n', '  - b: 2\n', '  + b: 3\n', '  - c: 3\n', '  + d: 5\n', '}\n',
      ],
    },
    {
      description: 'работает с вложенными объектами',
      obj1: {
        a: 1,
        b: { b1: 2, b2: { b21: { b212: 5 }, b23: 5 } },
        c: 3,
      },
      obj2: {
        a: 1,
        b: { b1: 1, b2: { b21: 3, b23: 4 } },
        d: { d1: 1 },
      },
      expected: [
        '{\n', '    a: 1\n', '    b: {\n', '      - b1: 2\n', '      + b1: 1\n', '        b2: {\n', '          - b21: {\n', '                b212: 5\n', '            }\n', '          + b21: 3\n', '          - b23: 5\n', '          + b23: 4\n', '        }\n', '    }\n', '  - c: 3\n', '  + d: {\n', '      d1: 1\n', '    }\n', '}\n',
      ],
    },
    {
      description: 'работает с файлами file1.json и file2.json',
      obj1: JSON.parse(fs.readFileSync(file1Path, 'utf-8')),
      obj2: JSON.parse(fs.readFileSync(file2Path, 'utf-8')),
      expected: [
        '{\n',
        '  common: {\n',
        '    + follow: false\n',
        '      setting1: Value 1\n',
        '    - setting2: 200\n',
        '    - setting3: true\n',
        '    + setting3: null\n',
        '    + setting4: blah blah\n',
        '    + setting5: {\n',
        '          key5: value5\n',
        '      }\n',
        '      setting6: {\n',
        '        doge: {\n',
        '          - wow: \n',
        '          + wow: so much\n',
        '        }\n',
        '        key: value\n',
        '      + ops: vops\n',
        '      }\n',
        '  }\n',
        '  group1: {\n',
        '    - baz: bas\n',
        '    + baz: bars\n',
        '      foo: bar\n',
        '    - nest: {\n',
        '          key: value\n',
        '      }\n',
        '    + nest: str\n',
        '  }\n',
        '  - group2: {\n',
        '        abc: 12345\n',
        '        deep: {\n',
        '            id: 45\n',
        '        }\n',
        '    }\n',
        '  + group3: {\n',
        '        deep: {\n',
        '            id: {\n',
        '                number: 45\n',
        '            }\n',
        '        }\n',
        '        fee: 100500\n',
        '    }\n',
        '}\n',
      ],
    },
  ];

  cases.forEach(({ description, obj1, obj2, expected }) => {
    it(description, () => {
      genDiff(obj1, obj2);
      expect(logSpy.mock.calls.flat()).toEqual(expected);
    });
  });
});
