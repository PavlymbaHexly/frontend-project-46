import * as fs from 'node:fs';
import yaml from 'js-yaml';
import * as path from 'node:path';

const readFile = (pathToFile) => fs.readFileSync(pathToFile, 'utf-8');

export const parseJSONData = (pathToFile) => JSON.parse(readFile(pathToFile));

export const parseYAMLData = (pathToFile) => yaml.load(readFile(pathToFile));

export const parseData = (pathToFile) => {
  const absPath = path.resolve(pathToFile);

  if (absPath.endsWith('.json')) {
    return parseJSONData(absPath);
  }

  if (absPath.endsWith('.yml') || absPath.endsWith('.yaml')) {
    return parseYAMLData(absPath);
  }

  throw new Error(`Unsupported file format: ${pathToFile}`);
};
