import _ from 'lodash';
import selectFormatter from './formatters/index.js';

const isLikeNumber = (symbol) => /^[0-9]+$/.test(symbol);

export const resolveIni = (parsedIni) => _.mapValues(parsedIni, (item) => {
  if (_.isObject(item)) {
    return resolveIni(item);
  }
  return isLikeNumber(item) ? Number(item) : item;
});

export const buildOutput = (format, diff) => selectFormatter(format)(diff);
