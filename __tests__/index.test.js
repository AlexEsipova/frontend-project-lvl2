import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('gendiff', () => {
  expect(genDiff(getFixturePath('before.json'), getFixturePath('after.json')))
    .toBe((readFile('json_expected.txt')));
});
