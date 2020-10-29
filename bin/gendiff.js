#!/usr/bin/node --experimental-json-modules

import program from 'commander';
import genDiff from '../src/index.js';
import pkg from '../package.json';

program
  .version(pkg.version, '-V, --version', 'output the version number')
  .description(pkg.description)
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
