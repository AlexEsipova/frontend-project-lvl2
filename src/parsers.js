import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parser = (filepath) => {
  const readFile = (file) => fs.readFileSync(file, 'utf8');
  const extname = path.extname(filepath);
  if (extname === '.json') {
    return JSON.parse(readFile(filepath));
  }
  if (extname === '.yml') {
    return yaml.safeLoad(readFile(filepath));
  }
  return ini.parse(readFile(filepath));
};

export default parser;
