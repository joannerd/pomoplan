export const types = {
  SESSION: 'session',
  BREAK: 'break',
  MIN: 'Minimum',
  MAX: 'Maximum',
};

export const lengthError = (type, minOrMax, length) => {
  const id = new Date().getTime();
  return {
    [id]: {
      id,
      type,
      message: `${minOrMax} ${type} length is ${length} minutes.`,
    },
  };
};

export const inputError = (type) => {
  const id = new Date().getTime();
  return {
    [id]: {
      id,
      type,
      message: 'Input must be a 2-digit number.',
    },
  };
};
