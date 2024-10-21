import _ from 'lodash';
import { indent, mergeDiffKeys } from '../utility.js';

export const stylish = (diff, depth = 1) => {
  const formatValue = (value, currentDepth) => {
    if (!_.isObject(value)) {
      return value;
    }

    const keys = Object.keys(value);
    const indentSpace = indent(currentDepth + 1);

    return `{\n${keys.map((key) => `${indentSpace}  ${key}: ${formatValue(value[key], currentDepth + 1)}`).join('\n')}\n${indent(currentDepth)}}`;
  };

  const iter = (currentDiff, currentDepth) => {
    const keys = mergeDiffKeys(currentDiff);

    return keys.map((key) => {
      const indentSpace = indent(currentDepth);
      if (key in currentDiff.added && key in currentDiff.removed) {
        return `${indentSpace}- ${key}: ${formatValue(currentDiff.removed[key], currentDepth)}\n${indentSpace}+ ${key}: ${formatValue(currentDiff.added[key], currentDepth)}`;
      }
      if (key in currentDiff.removed) {
        return `${indentSpace}- ${key}: ${formatValue(currentDiff.removed[key], currentDepth)}`;
      }
      if (key in currentDiff.added) {
        return `${indentSpace}+ ${key}: ${formatValue(currentDiff.added[key], currentDepth)}`;
      }
      return `${indentSpace}  ${key}: ${formatValue(currentDiff.common[key], currentDepth + 1)}`; // Измените currentDepth на currentDepth + 1
    }).join('\n');
  };

  return `{\n${iter(diff, depth)}\n${indent(depth - 1)}}`;
};

export default stylish;
