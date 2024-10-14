import _ from 'lodash';

const getIndent = (depth, count = 2) => ' '.repeat(depth * 4 - count);
const signOfDiffer = {
  nested: '  ',
  unchanged: '  ',
  deleted: '- ',
  added: '+ ',
};

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return String(currentValue);
  }
  const lines = Object.entries(currentValue).map(
    ([key, value]) => `${getIndent(depth)}${signOfDiffer.unchanged}${key}: ${stringify(value, depth + 1)}`,
  );
  return ['{', ...lines, `${getIndent(depth, 4)}}`].join('\n');
};

const formatValue = (obj, depth) => `${getIndent(depth)}${signOfDiffer[obj.type]}${obj.key}: ${stringify(obj.value, depth + 1)}`;

const stylish = (difTree) => {
  const getRender = (treeAST, depth = 1) => {
    const lines = treeAST.map((obj) => {
      switch (obj.type) {
        case 'nested':
          return `${getIndent(depth)}${signOfDiffer[obj.type]}${obj.key}: ${getRender(obj.value, depth + 1)}`;
        case 'unchanged':
        case 'deleted':
        case 'added':
          return formatValue(obj, depth);
        case 'changed': {
          const deleteValue = formatValue({ ...obj, type: 'deleted', value: obj.valueDeleted }, depth);
          const addedValue = formatValue({ ...obj, type: 'added', value: obj.valueAdded }, depth);
          return `${deleteValue}\n${addedValue}`;
        }
        default:
          return '';
      }
    });
    return ['{', ...lines, `${getIndent(depth, 4)}}`].join('\n');
  };
  return getRender(difTree);
};

export default stylish;
