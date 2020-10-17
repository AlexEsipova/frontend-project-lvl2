import _ from 'lodash';
import { formatParser, resolveKey } from './parsers.js';
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
        return [key, { value1: findDiff(obj1[key], obj2[key]), type: 'unchanged' }];
      }
      if (!_.has(obj2, key)) {
        return [key, { value1: resolveKey(obj1[key]), type: 'deleted' }];
      }
      if (!_.has(obj1, key)) {
        return [key, { value1: resolveKey(obj2[key]), type: 'added' }];
      }
      if (obj1[key] === obj2[key]) {
        return [key, { value1: resolveKey(obj1[key]), type: 'unchanged' }];
      }
      return [key, { value1: resolveKey(obj1[key]), value2: resolveKey(obj2[key]), type: 'changed' }];
    });
    return Object.fromEntries(result);
  };
  const internalTree = findDiff(newObj1, newObj2);
  return buildFormattedOutput(internalTree);
};

export default genDiff;
