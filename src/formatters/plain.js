import _ from 'lodash';

const outputValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getLines = (data, path = '') => data.reduce((acc, obj) => {
  const fullPath = `${path}${obj.key}.`;
  switch (obj.type) {
    case 'nested':
      return `${acc}${getLines(obj.value, fullPath)}`;
    case 'added':
      return `${acc}Property '${fullPath.slice(0, -1)}' was added with value: ${outputValue(obj.value)}\n`;
    case 'deleted':
      return `${acc}Property '${fullPath.slice(0, -1)}' was removed\n`;
    case 'changed':
      return `${acc}Property '${fullPath.slice(0, -1)}' was updated. From ${outputValue(obj.valueDeleted)} to ${outputValue(obj.valueAdded)}\n`;
    default:
      return `${acc}`;
  }
}, '');

const getPlainFormat = (difTree) => getLines(difTree).trim();

export default getPlainFormat;
