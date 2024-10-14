import _ from 'lodash';

const getTree = (obj1, obj2) => {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]).sort();

  return keys.map((key) => {
    const hasKeyInObj1 = _.has(obj1, key);
    const hasKeyInObj2 = _.has(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (hasKeyInObj1 && hasKeyInObj2) {
      if (_.isObject(value1) && _.isObject(value2)
       && !Array.isArray(value1) && !Array.isArray(value2)) {
        return { key, value: getTree(value1, value2), type: 'nested' };
      }
      if (!_.isEqual(value1, value2)) {
        return {
          key, valueDeleted: value1, valueAdded: value2, type: 'changed',
        };
      }
      return { key, value: value1, type: 'unchanged' };
    }

    return { key, value: hasKeyInObj1 ? value1 : value2, type: hasKeyInObj1 ? 'deleted' : 'added' };
  });
};

export default getTree;
