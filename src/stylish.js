const getIndent = (depth) => ' '.repeat(depth * 4);

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const stringify = (value, depth) => {
  if (!isObject(value)) return String(value);

  const indent = getIndent(depth + 1);
  const closingIndent = getIndent(depth);

  const entries = Object.entries(value).map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);
  return `{\n${entries.join('\n')}\n${closingIndent}}`;
};

const stylish = (diffTree, depth = 0) => {
  const iter = (node, currentDepth) => node.map((item) => {
    const {
      key, value, type, children,
    } = item;
    const indent = getIndent(currentDepth);

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(value, currentDepth)}`;
      case 'removed':
        return `${indent}- ${key}: ${stringify(value, currentDepth)}`;
      case 'changed':
        return `${indent}- ${key}: ${stringify(value.oldValue, currentDepth)}\n${indent}+ ${key}: ${stringify(value.newValue, currentDepth)}`;
      case 'unchanged':
        return `${indent}  ${key}: ${stringify(value, currentDepth)}`;
      case 'nested':
        return `${indent}${key}: {\n${iter(children, currentDepth + 1)}\n${indent}}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  }).join('\n');

  return `{\n${iter(diffTree, depth)}\n}`;
};

export default stylish;
