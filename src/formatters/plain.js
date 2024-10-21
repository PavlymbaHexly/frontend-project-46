import _ from 'lodash';
import { mergeDiffKeys } from '../utility.js';

const complexValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : `${value}`;
};

export const plain = (diff, path = '') => {
  const keys = mergeDiffKeys(diff);

  return keys.reduce((result, key) => {
    const currentPath = path ? `${path}.${key}` : key;

    const hasAdded = key in diff.added;
    const hasRemoved = key in diff.removed;
    const hasCommon = key in diff.common;

    if (hasAdded && hasRemoved) {
      return `${result}Property '${currentPath}' was updated. From ${complexValue(diff.removed[key])} to ${complexValue(diff.added[key])}\n`;
    }

    if (hasCommon && _.isObject(diff.common[key])) {
      return result + plain(diff.common[key], currentPath);
    }

    if (hasRemoved) {
      return `${result}Property '${currentPath}' was removed\n`;
    }

    if (hasAdded) {
      return `${result}Property '${currentPath}' was added with value: ${complexValue(diff.added[key])}\n`;
    }

    return result;
  }, '');
};

export default plain;
