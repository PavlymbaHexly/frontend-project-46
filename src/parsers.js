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
