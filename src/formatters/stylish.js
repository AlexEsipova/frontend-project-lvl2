import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const stringify = (val, externalIndentSize) => {
  if (!_.isObject(val)) {
    return `${val}`;
  }
  const internalIndentSize = externalIndentSize + spacesCount;
  const indent = replacer.repeat(externalIndentSize);
  const lines = Object.entries(val)
    .map(([key, child]) => `  ${indent}  ${key}: ${stringify(child, internalIndentSize)}`);
  return `{\n${lines.join('\n')}\n${indent}}`;
};

const outputsTable = {
  parent: (currentIndent, currentIndentSize, currentArgs, fn) => {
    const { key, children } = currentArgs;
    return `  ${currentIndent}  ${key}: ${fn(children, currentIndentSize)}`;
  },
  changed: (currentIndent, currentIndentSize, currentArgs) => {
    const { key, value1, value2 } = currentArgs;
    return [
      `  ${currentIndent}- ${key}: ${stringify(value1, currentIndentSize)}`,
      `  ${currentIndent}+ ${key}: ${stringify(value2, currentIndentSize)}`,
    ];
  },
  added: (currentIndent, currentIndentSize, currentArgs) => {
    const { key, value } = currentArgs;
    return `  ${currentIndent}+ ${key}: ${stringify(value, currentIndentSize)}`;
  },
  deleted: (currentIndent, currentIndentSize, currentArgs) => {
    const { key, value } = currentArgs;
    return `  ${currentIndent}- ${key}: ${stringify(value, currentIndentSize)}`;
  },
  unchanged: (currentIndent, currentIndentSize, currentArgs) => {
    const { key, value } = currentArgs;
    return `  ${currentIndent}  ${key}: ${stringify(value, currentIndentSize)}`;
  },
};

export default (tree) => {
  const iter = (currentValue, externalIndentSize) => {
    const internalIndentSize = externalIndentSize + spacesCount;
    const indent = replacer.repeat(externalIndentSize);
    const lines = currentValue.flatMap((branch) => {
      const { type, ...rest } = branch;
      if (!_.has(outputsTable, type)) {
        throw new Error(`Unknown type '${type}'`);
      }
      return outputsTable[type](indent, internalIndentSize, rest, iter);
    });
    return `{\n${lines.join('\n')}\n${indent}}`;
  };
  return iter(tree, 0);
};
