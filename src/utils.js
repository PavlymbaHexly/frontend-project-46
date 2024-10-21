import _ from 'lodash';

export const indent = (it, left = 0, i = 4) => {
  const repeats = it * i - left;
  return repeats > 0 ? ' '.repeat(repeats) : '';
};

export const mergeKeys = (keys1, keys2) => _.sortBy([...new Set([...keys1, ...keys2])]);

export const mergeDiffKeys = (diff) => {
  const merged = new Set([
    ...Object.keys(diff.added),
    ...Object.keys(diff.removed),
    ...Object.keys(diff.common),
  ]);
  return _.sortBy([...merged]);
};

export const createDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const mergedKeys = _.sortBy([...new Set([...keys1, ...keys2])]);

  return mergedKeys.reduce((acc, key) => {
    const isKeyInData1 = keys1.includes(key);
    const isKeyInData2 = keys2.includes(key);

    const newAcc = {
      added: { ...acc.added },
      removed: { ...acc.removed },
      common: { ...acc.common },
    };

    if (isKeyInData1 && isKeyInData2) {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        newAcc.common[key] = createDiff(data1[key], data2[key]);
      } else if (data1[key] === data2[key]) {
        newAcc.common[key] = data1[key];
      } else {
        newAcc.removed[key] = data1[key];
        newAcc.added[key] = data2[key];
      }
    } else if (isKeyInData1) {
      newAcc.removed[key] = data1[key];
    } else {
      newAcc.added[key] = data2[key];
    }

    return newAcc;
  }, { added: {}, removed: {}, common: {} });
};

export default {
  indent, mergeKeys, mergeDiffKeys, createDiff,
};
