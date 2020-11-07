import formatParser from './src/parsers.js';
import { buildOutput } from './src/utils.js';
import findDiff from './src/diff.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const newObj1 = formatParser(file1);
  const newObj2 = formatParser(file2);
  const diff = findDiff(newObj1, newObj2);
  return buildOutput(format, diff);
};

export default genDiff;
