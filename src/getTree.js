import _ from 'lodash';

const getTree = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

  return keys.map((key) => {
    const type = getType(key, obj1, obj2);
    const value = getValue(key, obj1, obj2, type);

    return {
      key,
      ...(typeof value === 'object' ? value : { value }),
      type,
    };
  });
};

const getType = (key, obj1, obj2) => {
  const hasKeyInObj1 = _.has(obj1, key);
  const hasKeyInObj2 = _.has(obj2, key);
  const areBothObjects = _.isObject(obj1[key]) && _.isObject(obj2[key])
    && !Array.isArray(obj1[key]) && !Array.isArray(obj2[key]);

  if (hasKeyInObj1 && hasKeyInObj2 && areBothObjects) {
    return 'nested';
  }

  if (hasKeyInObj1 && hasKeyInObj2 && _.isEqual(obj1[key], obj2[key])) {
    return 'unchanged';
  }

  if (!hasKeyInObj2) {
    return 'deleted';
  }

  if (!hasKeyInObj1) {
    return 'added';
  }

  return 'changed';
};

const getValue = (key, obj1, obj2, type) => {
  if (type === 'nested') {
    return getTree(obj1[key], obj2[key]);
  }

  if (type === 'unchanged') {
    return obj1[key];
  }

  if (type === 'deleted') {
    return obj1[key];
  }

  if (type === 'added') {
    return obj2[key];
  }

  return {
    valueDeleted: obj1[key],
    valueAdded: obj2[key],
  };
};

export default getTree;
