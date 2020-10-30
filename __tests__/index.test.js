import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

describe.each([['.json'], ['.yml'], ['.ini']])('extension %s', (extention) => {
  const formatsAndExpected = [
    ['stylish', readFile('expected_stylish.txt')],
    ['plain', readFile('expected_plain.txt')],
    ['json', readFile('expected_json.txt')],
  ];
  test.each(formatsAndExpected)('gendiff', (format, expected) => {
    expect(genDiff(getFixturePath(`before${extention}`), getFixturePath(`after${extention}`), format))
      .toBe(expected);
  });
});
