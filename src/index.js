import pkg from 'lodash';
import parseData from './parsers.js';
import stylish from './stylish.js';

const { union, has, isObject } = pkg;

const genDiff = (filepath1, filepath2) => {
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);

  const buildDiffTree = (obj1, obj2) => {
    const keys = union(Object.keys(obj1), Object.keys(obj2)).sort();
    return keys.map((key) => {
      if (!has(obj2, key)) {
        return { key, value: obj1[key], type: 'removed' };
      }
      if (!has(obj1, key)) {
        return { key, value: obj2[key], type: 'added' };
      }
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (isObject(value1) && isObject(value2)) {
        return { key, children: buildDiffTree(value1, value2), type: 'nested' };
      }
      if (value1 !== value2) {
        return { key, value: { oldValue: value1, newValue: value2 }, type: 'changed' };
      }
      return { key, value: value1, type: 'unchanged' };
    });
  };

  const diffTree = buildDiffTree(data1, data2);
  return stylish(diffTree);
};

export default genDiff;
