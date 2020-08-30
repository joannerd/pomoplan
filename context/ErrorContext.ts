import { createContext, useContext } from 'react';

export enum ErrorType {
  SESSION = 'session',
  BREAK = 'break',
  MIN = 'Minimum',
  MAX = 'Maximum',
};

export interface IError {
  id: number;
  message: string;
};

export interface IErrors {
  [id: number]: IError;
};

export interface IErrorContextValue {
  errors: IErrors;
  setNewLengthError: (
    type: ErrorType,
    minOrMax: string,
    length: number
  ) => void;
  setNewInputError: () => void;
  clearError: (id: number) => void;
  clearErrors: () => void;
};

export const ErrorContext: React.Context<IErrorContextValue> = createContext<IErrorContextValue>({
  errors: {},
  setNewLengthError: () => {},
  setNewInputError: () => {},
  clearErrors: () => {},
  clearError: () => {},
});

export const useError = (): IErrorContextValue => {
  const {
    errors,
    setNewLengthError,
    setNewInputError,
    clearErrors,
    clearError,
  } = useContext(ErrorContext);

  return {
    errors,
    setNewLengthError,
    setNewInputError,
    clearErrors,
    clearError,
  };
};
