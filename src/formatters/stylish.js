const resolveKey = (item, type) => {
  if (type === 'added') {
    return `+ ${item}`;
  }
  if (type === 'deleted') {
    return `- ${item}`;
  }
  return `  ${item}`;
};

const buildTree = (obj, replacer = '    ', spacesCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') {
      return `${currentValue}`;
    }
    const deepIndentSize = depth;
    const deepIndent = replacer.repeat(deepIndentSize);
    const currentIndent = replacer.repeat(depth);
    const lines = Object
      .entries(currentValue)
      .map(([key, { value1, value2, type }]) => {
        if (type === 'changed') {
          return `  ${deepIndent}- ${key}: ${iter(value1, deepIndentSize + spacesCount)}\n  ${deepIndent}+ ${key}: ${iter(value2, deepIndentSize + spacesCount)}`;
        }
        return `  ${deepIndent}${resolveKey(key, type)}: ${iter(value1, deepIndentSize + spacesCount)}`;
      });
    return [
      '{',
      ...lines,
      `${currentIndent}}`,
    ].join('\n');
  };

  return iter(obj, 0);
};

export default buildTree;
