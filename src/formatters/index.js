import buildTree from './stylish.js';
import buildPlain from './plain.js';

const formatters = {
  stylish: buildTree,
  plain: buildPlain,
  json: JSON.stringify,
};

const selectFormatter = (name) => formatters[name];

export default selectFormatter;
