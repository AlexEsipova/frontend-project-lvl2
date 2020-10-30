import formatParser from './parsers.js';
import buildFormattedOutput from './formatters/index.js';
import findDiff from './diff.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const newObj1 = formatParser(file1);
  const newObj2 = formatParser(file2);
  const diff = findDiff(newObj1, newObj2);
  return buildFormattedOutput(format)(diff);
};

export default genDiff;
