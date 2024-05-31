import * as fs from 'node:fs';
import * as path from 'node:path';
import yaml from 'js-yaml';

export const parseData = (filePath) => {
  const ext = path.extname(filePath);
  const data = fs.readFileSync(filePath, 'utf-8');
  if (ext === '.json') {
    return JSON.parse(data);
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(data);
  }
  throw new Error(`Unsupported file format: ${ext}`);
};

export const genDiff = (filePath1, filePath2) => {
  const data1 = parseData(filePath1);
  const data2 = parseData(filePath2);

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
