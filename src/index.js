import _ from 'lodash';
import parser from './parsers.js';

const genDiff = (file1, file2) => {
  const newObj1 = parser(file1);
  const newObj2 = parser(file2);
  const findDiff = (obj1, obj2) => {
    const keys = Object.keys({ ...obj1, ...obj2 });
    const sortedKeys = keys.sort();
    const result = [];
    sortedKeys.forEach((key) => {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        result.push([`  ${key}: ${findDiff(obj1[key], obj2[key])}`]);
      } else if (!_.has(obj2, key)) {
        result.push([`- ${key}: ${obj1[key]}`]);
      } else if (!_.has(obj1, key)) {
        result.push([`+ ${key}: ${obj2[key]}`]);
      } else if (obj1[key] === obj2[key]) {
        result.push([`  ${key}: ${obj1[key]}`]);
      } else {
        result.push([`- ${key}: ${obj1[key]}`]);
        result.push([`+ ${key}: ${obj2[key]}`]);
      }
    });
    return `{\n  ${result.join('\n  ')}\n}`;
  };
  return findDiff(newObj1, newObj2);
};

export default genDiff;
