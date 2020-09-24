import _ from 'lodash';
import parser from './parsers.js';

const genDiff = (file1, file2) => {
  const obj1 = parser(file1);
  const obj2 = parser(file2);
  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = keys.sort();
  const result = [];
  sortedKeys.forEach((key) => {
    if (!_.has(obj2, key)) {
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

export default genDiff;
