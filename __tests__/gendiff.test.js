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

test('тест_1: проверка выбрасывания ошибки: Внимание! Этот формат файла не поддерживается!', () => {
  expect(() => renderResult('file1.json', 'filepath.wrong')).toThrow('Внимание! Этот формат файла не поддерживается!');
});

test('тест_2: разница в вложенных строках от форматов .json', () => {
  expect(renderResult('file1.json', 'file2.json')).toEqual(expectedNested);
});

test('тест_3: разница в вложенных строках от форматов .yml', () => {
  expect(renderResult('filepath1.yml', 'filepath2.yml')).toEqual(expectedNested);
});

test('тест_4: разница в вложенных строках от форматов .yml и .json', () => {
  expect(renderResult('filepath1.yml', 'file2.json')).toEqual(expectedNested);
});

test('тест_5: разница в строках формата plain от форматов .json', () => {
  expect(renderResult('file1.json', 'file2.json', 'plain')).toEqual(expectedPlain);
});

test('тест_6: разница в строках формата plain от форматов .yml', () => {
  expect(renderResult('filepath1.yml', 'filepath2.yml', 'plain')).toEqual(expectedPlain);
});

test('тест_7: разница в строках формата plain от форматов .yml и .json', () => {
  expect(renderResult('file1.json', 'filepath2.yml', 'plain')).toEqual(expectedPlain);
});

test('тест_8: разница в строках формата JSON от форматов .yaml и .json', () => {
  expect(renderResult('filepath1.yml', 'file2.json', 'json')).toEqual(expectedJson);
});
