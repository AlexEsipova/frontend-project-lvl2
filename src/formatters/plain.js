import _ from 'lodash';

const stringify = (item) => {
  if (typeof item === 'string') {
    return `'${item}'`;
  }
  if (_.isPlainObject(item)) {
    return '[complex value]';
  }
  return `${item}`;
};

const outputsTable = {
  parent: (currentPath, currentArgs, fn) => {
    const { children } = currentArgs;
    return fn(children, currentPath);
  },
  changed: (currentPath, currentArgs) => {
    const { value1, value2 } = currentArgs;
    return `Property '${currentPath.join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
  },
  added: (currentPath, currentArgs) => {
    const { value } = currentArgs;
    return `Property '${currentPath.join('.')}' was added with value: ${stringify(value)}`;
  },
  deleted: (currentPath) => `Property '${currentPath.join('.')}' was removed`,
  unchanged: () => [],
};

const buildPlain = (tree) => {
  const iter = (currentValue, path) => {
    const lines = currentValue
      .flatMap((branch) => {
        const { key, type, ...rest } = branch;
        const newPath = [...path, key];

        if (!_.has(outputsTable, type)) {
          throw new Error(`Unknown type '${type}'`);
        }
        return outputsTable[type](newPath, rest, iter);
      });

    return lines.join('\n');
  };
  return iter(tree, []);
};

export default buildPlain;
