import { test, expect, describe, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

let formatsAndExpected;

beforeAll(() => {
  formatsAndExpected = [
    ['stylish', readFile('expected_stylish.txt')],
    ['plain', readFile('expected_plain.txt')],
    ['json', readFile('expected_json.txt')],
  ];
});

describe.each([['.json'], ['.yml'], ['.ini']])('extension %s', (extention) => {
  test.each(formatsAndExpected)('gendiff', (format, expected) => {
    expect(genDiff(getFixturePath(`before${extention}`), getFixturePath(`after${extention}`), format))
      .toBe(expected);
  });
});
