import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const resolveIni = (parsedIni) => {
  const keys = Object.keys(parsedIni);
  const result = keys.map((key) => {
    if (typeof parsedIni[key] === 'object') {
      return [key, resolveIni(parsedIni[key])];
    }
    if (/^[0-9]+$/.test(parsedIni[key])) {
      return [key, Number(parsedIni[key])];
    }
    return [key, parsedIni[key]];
  });
  return Object.fromEntries(result);
};

export const formatParser = (filepath) => {
  const readFile = (file) => fs.readFileSync(file, 'utf8');
  const extname = path.extname(filepath);
  if (extname === '.json') {
    return JSON.parse(readFile(filepath));
  }
  if (extname === '.yml') {
    return yaml.safeLoad(readFile(filepath));
  }
  return resolveIni(ini.parse(readFile(filepath)));
};

export const resolveKey = (value) => {
  if (value === null) {
    return `${value}`;
  }
  if (typeof value !== 'object') {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    if (typeof value[key] === 'object') {
      return [key, { value1: resolveKey(value[key]) }];
    }
    return [key, { value1: value[key] }];
  });
  return Object.fromEntries(result);
};
