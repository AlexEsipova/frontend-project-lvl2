#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentOfPKG = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')));

program
  .version(contentOfPKG.version, '-V, --version', 'output the version number')
  .description(contentOfPKG.description)
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
