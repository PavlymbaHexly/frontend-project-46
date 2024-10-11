import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

export const parseData = (path) => {
  const ext = Object.keys(parsers).find(ext => path.endsWith(ext));
  if (!ext) {
    throw new Error('Unsupported file extension');
  }

  try {
    const data = readFileSync(path, 'utf-8');
    return parsers[ext](data);
  } catch (err) {
    throw new Error(`Failed to read or parse file: ${err.message}`);
  }
};
