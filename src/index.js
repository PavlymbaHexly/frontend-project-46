import _ from 'lodash';

export const mergeKeys = (keys1, keys2) => _.uniq([...keys1, ...keys2]).sort();

export const indent = (it, left = 0, i = 4) => ' '.repeat(Math.max(it * i - left, 0));

export const printDiff = (key, value, it, sign) => {
  process.stdout.write(`${indent(it, 2)}${sign} ${key}: ${_.isObject(value) ? '' : value}\n`);
  if (_.isObject(value)) genDiff(value, value, it + 1);
};

export const genDiff = (data1, data2, it = 1) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const mergedKeys = mergeKeys(keys1, keys2);
  const indentLevel = indent(it, 2);

  process.stdout.write('{\n');
  mergedKeys.forEach((key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      if (_.isObject(data1[key]) && _.isObject(data2[key])) {
        process.stdout.write(`${indentLevel}  ${key}: {\n`);
        genDiff(data1[key], data2[key], it + 1);
        process.stdout.write(`${indent(it)}  }\n`);
      } else if (data1[key] === data2[key]) {
        process.stdout.write(`${indentLevel}  ${key}: ${data1[key]}\n`);
      } else {
        printDiff(key, data1, it, '-');
        printDiff(key, data2, it, '+');
      }
    } else if (keys1.includes(key)) {
      printDiff(key, data1, it, '-');
    } else if (keys2.includes(key)) {
      printDiff(key, data2, it, '+');
    }
  });
  process.stdout.write(`${indent(it - 1)}}\n`);
};
