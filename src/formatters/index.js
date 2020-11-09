import buildTree from './stylish.js';
import buildPlain from './plain.js';

const formatters = {
  stylish: buildTree,
  plain: buildPlain,
  json: JSON.stringify,
};

export default (diff, format) => formatters[format](diff);
