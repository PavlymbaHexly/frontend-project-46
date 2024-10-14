import _ from 'lodash';

const getTree = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

  return keys.map((key) => {
    const hasKeyInObj1 = _.has(obj1, key);
    const hasKeyInObj2 = _.has(obj2, key);
    const areBothObjects = _.isObject(obj1[key]) && _.isObject(obj2[key])
      && !Array.isArray(obj1[key]) && !Array.isArray(obj2[key]);

    // Создаем новый объект результата
    const result = {
      key,
      value: undefined,
      type: undefined,
    };

    // Условие для вложенных объектов
    if (hasKeyInObj1 && hasKeyInObj2 && areBothObjects) {
      return {
        ...result,
        value: getTree(obj1[key], obj2[key]),
        type: 'nested',
      };
    }
    if (hasKeyInObj1 && hasKeyInObj2 && _.isEqual(obj1[key], obj2[key])) {
      return {
        ...result,
        value: obj1[key],
        type: 'unchanged',
      };
    }
    if (!hasKeyInObj2) {
      return {
        ...result,
        value: obj1[key],
        type: 'deleted',
      };
    }
    if (!hasKeyInObj1) {
      return {
        ...result,
        value: obj2[key],
        type: 'added',
      };
    }

    // Случай, когда значения изменились
    return {
      ...result,
      valueDeleted: obj1[key],
      valueAdded: obj2[key],
      type: 'changed',
    };
  });
};

export default getTree;
