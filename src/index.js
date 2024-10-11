import _ from 'lodash';
import stylish from './stylish.js';

export const mergeKeys = (keys1, keys2) => _.uniq([...keys1, ...keys2]).sort();

export const indent = (it, left = 0, i = 4) => ' '.repeat(Math.max(it * i - left, 0));

export const printDiff = (key, value, it, sign) => {
  const outputValue = _.isObject(value) && !Array.isArray(value) ? '' : value;
  process.stdout.write(`${indent(it, 2)}${sign} ${key}: ${outputValue}\n`);
  if (_.isObject(value)) genDiff(value, value, it + 1);
};

export const genDiff = (data1, data2, it = 1) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const mergedKeys = mergeKeys(keys1, keys2);

  const result = [];

  mergedKeys.forEach((key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        result.push({
          key,
          type: 'nested',
          children: genDiff(data1[key], data2[key], it + 1),
        });
      } else if (data1[key] === data2[key]) {
        result.push({ key, value: data1[key], type: 'unchanged' });
      } else {
        result.push({
          key,
          value: { oldValue: data1[key], newValue: data2[key] },
          type: 'changed',
        });
      }
    } else if (keys1.includes(key)) {
      result.push({ key, value: data1[key], type: 'removed' });
    } else if (keys2.includes(key)) {
      result.push({ key, value: data2[key], type: 'added' });
    }
  });

  return result;
};
