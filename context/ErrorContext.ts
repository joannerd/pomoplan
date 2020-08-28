import { createContext, useContext } from 'react';
import { types } from '../lib/errors';

export enum ErrorType {
  SESSION = 'session',
  BREAK = 'break',
  MIN = 'Minimum',
  MAX = 'Maximum',
};

export interface Error {
  [id: number]: {
    id: number;
    message: string;
  };
};

export interface Errors {
  [id: number]: Error;
};

export interface ErrorContextValue {
  errors: Errors;
  types: {
    SESSION: string;
    BREAK: string;
    MAX: string;
    MIN: string;
  };
  setNewLengthError: (
    type: ErrorType,
    minOrMax: string,
    length: number
  ) => void;
  setNewInputError: (type: ErrorType) => void;
  clearError: (id: number) => void;
  clearErrors: () => void;
};

export const ErrorContext: React.Context<ErrorContextValue> = createContext<ErrorContextValue>({
  errors: {},
  types,
  setNewLengthError: () => {},
  setNewInputError: () => {},
  clearErrors: () => {},
  clearError: () => {},
});

export const useError = (): ErrorContextValue => {
  const {
    errors,
    types,
    setNewLengthError,
    setNewInputError,
    clearErrors,
    clearError,
  } = useContext(ErrorContext);

  return {
    errors,
    types,
    setNewLengthError,
    setNewInputError,
    clearErrors,
    clearError,
  };
};
