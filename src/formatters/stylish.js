import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(depth * 4);

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const indent = getIndent(depth + 1);
  const lines = keys.map((key) => `${indent}${key}: ${formatValue(value[key], depth + 1)}`);
  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

export const stylish = (diff, depth = 0) => {
  const indent = getIndent(depth);
  const lines = diff.map((node) => {
    switch (node.status) {
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value, depth)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value, depth)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${formatValue(node.value, depth)}`;
      case 'nested':
        return `${indent}  ${node.key}: ${stylish(node.children, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${formatValue(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${formatValue(node.newValue, depth)}`,
        ].join('\n');
      default:
        throw new Error(`Unknown status: ${node.status}`);
    }
  });

  return `{\n${lines.join('\n')}\n${indent}}`;
};

export default stylish;
