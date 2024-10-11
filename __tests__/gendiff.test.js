import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const renderResult = (file1, file2, format = 'stylish') => genDiff(getFixturePath(file1), getFixturePath(file2), format);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const expectedNested = readFile('expectDiffStylish.txt').trim();
const expectedPlain = readFile('expectDiffPlain.txt').trim();
const expectedJson = readFile('expectedDiffJson.txt').trim();

test('test_1: check throw new Error: Attention! This file format is not supported!', () => {
  expect(() => renderResult('file1.json', 'filepath.wrong')).toThrow('Attention! This file format is not supported!');
});

test('test_2: nested lines difference from .json\'s formats', () => {
  expect(renderResult('file1.json', 'file2.json')).toEqual(expectedNested);
});

test('test_3: nested lines difference from .yml\'s formats', () => {
  expect(renderResult('filepath1.yml', 'filepath2.yml')).toEqual(expectedNested);
});

test('test_4: nested lines difference from .yml && .json formats', () => {
  expect(renderResult('filepath1.yml', 'file2.json')).toEqual(expectedNested);
});

test('test_5: plain lines difference from .json\'s formats', () => {
  expect(renderResult('file1.json', 'file2.json', 'plain')).toEqual(expectedPlain);
});

test('test_6: plain lines difference from in .yml\'s formats', () => {
  expect(renderResult('filepath1.yml', 'filepath2.yml', 'plain')).toEqual(expectedPlain);
});

test('test_7: plain lines difference from .yml && .json formats', () => {
  expect(renderResult('file1.json', 'filepath2.yml', 'plain')).toEqual(expectedPlain);
});

test('test_8: JSON lines difference from .yaml && .json formats', () => {
  expect(renderResult('filepath1.yml', 'file2.json', 'json')).toEqual(expectedJson);
});
