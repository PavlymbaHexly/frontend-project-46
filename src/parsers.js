import * as fs from 'node:fs';
import yaml from 'js-yaml';
import * as path from 'node:path';

export const parseJSONData = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export const parseYAMLData = (filePath) => yaml.load(fs.readFileSync(filePath, 'utf-8'));

export const parseData = (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  switch (extname) {
    case '.json':
      return parseJSONData(filePath);
    case '.yml':
    case '.yaml':
      return parseYAMLData(filePath);
    default:
      console.error('Unsupported file extension:', extname);
      return null;
  }
};
