import * as fs from 'node:fs';
import _ from 'lodash';

export const parseData = (path) => JSON.parse(fs.readFileSync(path, 'utf-8'));

export const genDiff = (filePath1, filePath2) => {
  const data1 = parseData(filePath1);
  const data2 = parseData(filePath2);

  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort();
  const result = keys.map((key) => {
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};
