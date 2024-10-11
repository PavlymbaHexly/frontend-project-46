import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const typeConclusion = {
  plain,
  stylish,
  json,
};

const resultConclusion = (difTree, format = 'stylish') => typeConclusion[format](difTree);

export default resultConclusion;
