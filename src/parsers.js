import * as fs from 'node:fs';
import yaml from 'js-yaml';
import * as path from 'node:path';

export const parseJSONData = (pathToFile) => JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));

export const parseYAMLData = (pathToFile) => yaml.load(fs.readFileSync(pathToFile, 'utf-8'));

export const parseData = (pathToFile) => {
  const absPath = path.resolve(pathToFile);
  if (absPath.endsWith('.json')) {
    return parseJSONData(absPath);
  } else if (absPath.endsWith('.yml') || absPath.endsWith('.yaml')) {
    return parseYAMLData(absPath);
  }
  throw new Error(`Unsupported file format: ${pathToFile}`);
};
