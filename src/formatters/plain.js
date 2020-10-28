const resolveValue = (item) => {
  if (typeof item === 'object') {
    return '[complex value]';
  }
  if (typeof item !== 'string' || item === 'null') {
    return `${item}`;
  }
  return `'${item}'`;
};

const buildPlain = (value) => {
  const iter = (currentValue, path) => {
    if (typeof currentValue !== 'object') {
      return `${currentValue}`;
    }
    const lines = currentValue
      .map(({ key, type, value, children }) => {
        const newPath = (path === '') ? key : `${path}.${key}`;
        if (type === 'parent') {
          return iter(children, newPath);
        }
        if (type === 'changed') {
          const { value1, value2 } = value;
          return `Property '${newPath}' was updated. From ${resolveValue(value1)} to ${resolveValue(value2)}`;
        }
        if (type === 'added') {
          return `Property '${newPath}' was added with value: ${resolveValue(value)}`;
        }
        if (type === 'deleted') {
          return `Property '${newPath}' was removed`;
        }
        return null;
      })
      .filter((line) => line);

    return lines.join('\n');
  };
  return iter(value, '');
};

export default buildPlain;
