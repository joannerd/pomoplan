import { IError, ErrorType } from '../context/ErrorContext';

export const types = {
  SESSION: 'session',
  BREAK: 'break',
  MIN: 'Minimum',
  MAX: 'Maximum',
};

export const lengthError = (type: ErrorType, minOrMax: string, length: number): IError => {
  const id: number = new Date().getTime();
  return {
    id,
    message: `${minOrMax} ${type} length is ${length} minutes.`,
  };
};

export const inputError = (): IError => {
  const id = new Date().getTime();
  return {
    id,
    message: 'Input must be a 2-digit number.',
  };
};
