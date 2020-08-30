import { IErrors, ErrorType } from '../context/ErrorContext';

export const lengthError = (type: ErrorType, minOrMax: string, length: number): IErrors => {
  const id: number = new Date().getTime();
  return {
    [id]: {
      id,
      message: `${minOrMax} ${type} length is ${length} minutes.`,
    },
  };
};

export const inputError = (type: ErrorType): IErrors => {
  const id = new Date().getTime();
  return {
    [id]: {
      id,
      message: 'Input must be a 2-digit number.',
    },
  };
};
