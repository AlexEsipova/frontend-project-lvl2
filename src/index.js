import _ from 'lodash';
import formatParser from './parsers.js';
import buildTree from './build_tree.js';

const added = '+ ';
const deleted = '- ';
const unchanged = '  ';

const genDiff = (file1, file2) => {
  const newObj1 = formatParser(file1);
  const newObj2 = formatParser(file2);
  const findDiff = (obj1, obj2) => {
    const keys = Object.keys({ ...obj1, ...obj2 });
    const sortedKeys = keys.sort();
    const result = [];
    sortedKeys.map((key) => {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        result.push([`${unchanged}${key}`, findDiff(obj1[key], obj2[key])]);
      } else if (!_.has(obj2, key)) {
        result.push([`${deleted}${key}`, obj1[key]]);
      } else if (!_.has(obj1, key)) {
        result.push([`${added}${key}`, obj2[key]]);
      } else if (obj1[key] === obj2[key]) {
        result.push([`${unchanged}${key}`, obj1[key]]);
      } else {
        result.push([`${deleted}${key}`, obj1[key]]);
        result.push([`${added}${key}`, obj2[key]]);
      }
      return result;
    });
    return Object.fromEntries(result);
  };
  return buildTree(findDiff(newObj1, newObj2));
};

export default genDiff;
