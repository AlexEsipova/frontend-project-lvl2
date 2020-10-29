import _ from 'lodash';
import formatParser from './parsers.js';
import selectFormatter from './formatters/index.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const buildFormattedOutput = selectFormatter(format);
  const newObj1 = formatParser(file1);
  const newObj2 = formatParser(file2);
  const findDiff = (obj1, obj2) => {
    const keys = Object.keys({ ...obj1, ...obj2 });
    const sortedKeys = _.sortBy(keys);
    const result = sortedKeys.map((key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return { key, type: 'parent', children: findDiff(obj1[key], obj2[key]) };
      }
      if (!_.has(obj2, key)) {
        return { key, type: 'deleted', value: obj1[key] };
      }
      if (!_.has(obj1, key)) {
        return { key, type: 'added', value: obj2[key] };
      }
      if (obj1[key] === obj2[key]) {
        return { key, type: 'unchanged', value: obj1[key] };
      }
      return {
        key, type: 'changed', value1: obj1[key], value2: obj2[key],
      };
    });
    return result;
  };
  const internalTree = findDiff(newObj1, newObj2);
  return buildFormattedOutput(internalTree);
};

export default genDiff;
