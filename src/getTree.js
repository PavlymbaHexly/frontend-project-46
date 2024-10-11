import _ from 'lodash';

const getTree = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

  return keys.map((key) => {
    if (_.has(obj2, key)
      && _.has(obj1, key)
      && _.isObject(obj1[key])
      && _.isObject(obj2[key])
      && !Array.isArray(obj1[key])
      && !Array.isArray(obj2[key])) {
      return { key, value: getTree(obj1[key], obj2[key]), type: 'nested' };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, value: obj1[key], type: 'unchanged' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], type: 'deleted' };
    }
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    }
    return {
      key,
      valueDeleted: obj1[key],
      valueAdded: obj2[key],
      type: 'changed',
    };
  });
};

export default getTree;
