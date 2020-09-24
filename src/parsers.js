import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = (filepath) => {
  const readFile = (file) => fs.readFileSync(file, 'utf8');
  const extname = path.extname(filepath);
  if (extname === '.json') {
    return JSON.parse(readFile(filepath));
  }
  if (extname === '.yml') {
    return yaml.safeLoad(readFile(filepath));
  }
  return null;
};

export default parser;
