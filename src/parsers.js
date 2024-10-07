import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

export const parseData = (path) => {
  const ext = Object.keys(parsers).find(ext => path.endsWith(ext));
  return ext ? parsers[ext](readFileSync(path, 'utf-8')) : null;
};
