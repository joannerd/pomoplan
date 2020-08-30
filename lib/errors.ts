import { Error, ErrorType } from '../context/ErrorContext';

export const types = {
  SESSION: 'session',
  BREAK: 'break',
  MIN: 'Minimum',
  MAX: 'Maximum',
};

export const lengthError = (type: ErrorType, minOrMax: string, length: number): Error => {
  const id: number = new Date().getTime();
  return {
    [id]: {
      id,
      message: `${minOrMax} ${type} length is ${length} minutes.`,
    },
  };
};

export const inputError = (type: ErrorType): Error => {
  const id = new Date().getTime();
  return {
    [id]: {
      id,
      message: 'Input must be a 2-digit number.',
    },
  };
};
