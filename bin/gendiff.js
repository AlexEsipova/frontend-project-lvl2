#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToPkg = path.join(__dirname, '..', 'package.json');
const readPkg = fs.readFileSync(pathToPkg);
const pkg = JSON.parse(readPkg);

program
  .version(pkg.version, '-V, --version', 'output the version number')
  .description(pkg.description)
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
