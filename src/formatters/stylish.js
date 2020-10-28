const resolveKey = (item, status) => {
  if (status === 'added') {
    return `+ ${item}`;
  }
  if (status === 'deleted') {
    return `- ${item}`;
  }
  return `  ${item}`;
};

const buildOutput = (value, replacer = '    ', spacesCount = 1) => {
  const iter = (data, depth) => {
    if (typeof data !== 'object' || data === null) {
      return `${data}`;
    }
    const entries = Object.entries(data);

    const lines = entries.map(([key, child]) => {
      if (key.startsWith('+ ') || key.startsWith('- ') || key.startsWith('  ')) {
        return `  ${replacer.repeat(depth)}${key}: ${iter(child, depth + spacesCount)}`;
      }
      return `  ${replacer.repeat(depth)}  ${key}: ${iter(child, depth + spacesCount)}`;
    });
    return `{\n${lines.join('\n')}\n${replacer.repeat(depth)}}`;
  };

  return iter(value, 0);
};

const buildTree = (array) => {
  const buildObj = (arr) => {
    const result = arr.flatMap((element) => {
      const {
        key, type, value, children,
      } = element;
      const newKey = resolveKey(key, type);
      if (type === 'parent') {
        return [[newKey, buildObj(children)]];
      }
      if (type === 'changed') {
        const { value1, value2 } = value;
        const firstKey = resolveKey(key, 'deleted');
        const secondKey = resolveKey(key, 'added');
        return [[firstKey, value1], [secondKey, value2]];
      }
      return [[newKey, value]];
    });
    return Object.fromEntries(result);
  };
  return buildOutput(buildObj(array));
};

export default buildTree;
