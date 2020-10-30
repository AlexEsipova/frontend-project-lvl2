#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const contentOfPKG = JSON.parse(fs.readFileSync(path.resolve('frontend-project-lvl2', 'package.json')));

program
  .version(contentOfPKG.version, '-V, --version', 'output the version number')
  .description(contentOfPKG.description)
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
