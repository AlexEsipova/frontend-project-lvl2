import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

describe.each([['.json'], ['.yml'], ['.ini']])('extension %s', (extension) => {
  const data = [
    ['stylish', readFile('expected_stylish.txt')],
    ['plain', readFile('expected_plain.txt')],
    ['json', readFile('expected_json.txt')],
  ];
  test.each(data)('gendiff', (format, expected) => {
    expect(genDiff(getFixturePath(`before${extension}`), getFixturePath(`after${extension}`), format))
      .toBe(expected);
  });
});
