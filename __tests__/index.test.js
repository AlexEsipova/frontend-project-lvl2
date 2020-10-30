import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
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
