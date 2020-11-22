import fs from 'fs';
import path from 'path';
import parse from './src/parsers/index.js';
import format from './src/formatters/index.js';
import findDiff from './src/findDiff.js';

const getFileFormat = (fileName) => path.extname(fileName).slice(1);

const readFile = (file) => fs.readFileSync(file, 'utf8');

const genDiff = (file1, file2, outputFormat = 'stylish') => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);
  const type1 = getFileFormat(file1);
  const type2 = getFileFormat(file2);
  const newObj1 = parse(data1, type1);
  const newObj2 = parse(data2, type2);
  const diff = findDiff(newObj1, newObj2);
  return format(diff, outputFormat);
};

export default genDiff;
