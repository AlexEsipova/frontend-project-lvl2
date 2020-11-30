import _ from 'lodash';

const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return `${value}`;
};

const stringifyPath = (path) => path.join('.');

const mapping = {
  parent: (path, { children }, iter) => iter(children, path),
  changed: (path, { value1, value2 }) => `Property '${stringifyPath(path)}' was updated. From ${stringify(value1)} to ${stringify(value2)}`,
  added: (path, { value }) => `Property '${stringifyPath(path)}' was added with value: ${stringify(value)}`,
  deleted: (path) => `Property '${stringifyPath(path)}' was removed`,
  unchanged: () => [],
};

export default (tree) => {
  const iter = (nodes, path) => {
    const lines = nodes
      .flatMap((node) => {
        const { key, type } = node;
        if (!_.has(mapping, type)) {
          throw new Error(`Unknown type '${type}'`);
        }
        return mapping[type]([...path, key], node, iter);
      });

    return lines.join('\n');
  };
  return iter(tree, []);
};
