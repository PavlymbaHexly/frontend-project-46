import _ from 'lodash';

const getTree = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

  return keys.map((key) => {
    const hasKeyInObj1 = _.has(obj1, key);
    const hasKeyInObj2 = _.has(obj2, key);
    const areBothObjects = _.isObject(obj1[key]) && _.isObject(obj2[key])
      && !Array.isArray(obj1[key]) && !Array.isArray(obj2[key]);

    const result = { key };

    if (hasKeyInObj1 && hasKeyInObj2 && areBothObjects) {
      result.value = getTree(obj1[key], obj2[key]);
      result.type = 'nested';
    } else if (hasKeyInObj1 && hasKeyInObj2 && _.isEqual(obj1[key], obj2[key])) {
      result.value = obj1[key];
      result.type = 'unchanged';
    } else if (!hasKeyInObj2) {
      result.value = obj1[key];
      result.type = 'deleted';
    } else if (!hasKeyInObj1) {
      result.value = obj2[key];
      result.type = 'added';
    } else {
      result.valueDeleted = obj1[key];
      result.valueAdded = obj2[key];
      result.type = 'changed';
    }

    return result;
  });
};

export default getTree;
