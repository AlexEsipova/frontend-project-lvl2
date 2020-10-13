import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test.each([
  ['.json', 'stylish', 'expected_stylish.txt'],
  ['.json', 'plain', 'expected_plain.txt'],
  ['.json', 'json', 'expected_json.txt'],
  ['.yml', 'stylish', 'expected_stylish.txt'],
  ['.yml', 'plain', 'expected_plain.txt'],
  ['.yml', 'json', 'expected_json.txt'],
  ['.ini', 'stylish', 'expected_stylish.txt'],
  ['.ini', 'plain', 'expected_plain.txt'],
  ['.ini', 'json', 'expected_json.txt'],
])('gendiff', (format, outputFormat, expected) => {
  expect(genDiff(getFixturePath(`before${format}`), getFixturePath(`after${format}`), outputFormat))
    .toBe((readFile(expected)));
});
