import _ from 'lodash';

const outputValue = (value) => (_.isObject(value) ? '[complex value]' : _.isString(value) ? `'${value}'` : value);

const getLines = (data, path = '') => data.reduce((acc, { key, type, value, valueDeleted, valueAdded }) => {
  const fullPath = `${path}${key}.`;

  switch (type) {
    case 'nested':
      return `${acc}${getLines(value, fullPath)}`;
    case 'added':
      return `${acc}Property '${fullPath.slice(0, -1)}' was added with value: ${outputValue(value)}\n`;
    case 'deleted':
      return `${acc}Property '${fullPath.slice(0, -1)}' was removed\n`;
    case 'changed':
      return `${acc}Property '${fullPath.slice(0, -1)}' was updated. From ${outputValue(valueDeleted)} to ${outputValue(valueAdded)}\n`;
    default:
      return acc;
  }
}, '');

const getPlainFormat = (difTree) => getLines(difTree).trim();

export default getPlainFormat;
