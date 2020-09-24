import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test.each([
  ['.json'],
  ['.yml'],
  ['.ini'],
])('gendiff', (format) => {
  expect(genDiff(getFixturePath(`before${format}`), getFixturePath(`after${format}`)))
    .toBe((readFile('expected.txt')));
});
