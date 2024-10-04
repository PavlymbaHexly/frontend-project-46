import pkg from 'lodash';
import { parseData } from './parsers.js';

const { union, has } = pkg;

export const genDiff = (data1, data2) => {
  const keys = union(Object.keys(data1), Object.keys(data2)).sort();
  const result = keys.map((key) => {
    if (!has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};
