import _ from 'lodash';

export const indent = (it, left = 0, i = 4) => {
  const repeats = Math.max(it * i - left, 0);
  return ' '.repeat(repeats);
};

export const mergeKeys = (keys1, keys2) => {
  const merged = [...new Set([...keys1, ...keys2])];
  return _.sortBy(merged);
};

export const mergeDiffKeys = (diff) => {
  const merged = new Set([...Object.keys(diff.added), ...Object.keys(diff.removed), ...Object.keys(diff.common)]);
  return _.sortBy([...merged]);
};

export const createDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const mergedKeys = _.sortBy([...new Set([...keys1, ...keys2])]);

  return mergedKeys.reduce((diff, key) => {
    const commonValue1 = data1[key];
    const commonValue2 = data2[key];

    if (keys1.includes(key) && keys2.includes(key)) {
      if (_.isObject(commonValue1) && _.isObject(commonValue2)) {
        return {
          added: diff.added,
          removed: diff.removed,
          common: {
            ...diff.common,
            [key]: createDiff(commonValue1, commonValue2),
          },
        };
      }

      if (commonValue1 === commonValue2) {
        return {
          added: diff.added,
          removed: diff.removed,
          common: {
            ...diff.common,
            [key]: commonValue1,
          },
        };
      }

      return {
        added: { ...diff.added, [key]: commonValue2 },
        removed: { ...diff.removed, [key]: commonValue1 },
        common: diff.common,
      };
    }

    if (keys1.includes(key)) {
      return {
        added: diff.added,
        removed: { ...diff.removed, [key]: commonValue1 },
        common: diff.common,
      };
    }

    return {
      added: { ...diff.added, [key]: commonValue2 },
      removed: diff.removed,
      common: diff.common,
    };
  }, { added: {}, removed: {}, common: {} });
};