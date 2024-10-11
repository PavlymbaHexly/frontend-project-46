import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const resultConclusion = (difTree, format = 'stylish') => {
  const formatters = { plain, stylish, json };
  return formatters[format](difTree);
};

export default resultConclusion;
