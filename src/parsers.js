import fs from 'fs';
import yaml from 'js-yaml';

export const parseJSONData = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data);
};

export const parseYAMLData = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  return yaml.load(data);
};

export const parseData = (filepath) => {
  if (filepath.endsWith('.json')) {
    return parseJSONData(filepath);
  }
  if (filepath.endsWith('.yml') || filepath.endsWith('.yaml')) {
    return parseYAMLData(filepath);
  }
  throw new Error('Unsupported file type');
};
