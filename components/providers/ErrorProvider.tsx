import { useState, useMemo } from 'react';
import {
  ErrorContext,
  IErrorContextValue,
  IErrors,
  ErrorType,
} from '../../context/ErrorContext';
import { lengthError, inputError } from '../../lib/errors';
import { IProviderProps } from './types';

const ErrorProvider = ({ children }: IProviderProps): React.ReactElement => {
  const [errors, setErrors] = useState<IErrors>({});

  const setNewLengthError = (
    type: ErrorType,
    minOrMax: string,
    length: number,
  ): void => {
    const newError = lengthError(type, minOrMax, length);
    setErrors((errors) => ({ ...errors, ...newError }));
  };

  const setNewInputError = (): void => {
    const newError = inputError();
    setErrors((errors) => ({ ...errors, ...newError }));
  };

  const clearErrors = (): void => setErrors({});

  const clearError = (id: number): void => {
    const updatedErrors = { ...errors };
    delete updatedErrors[id];
    setErrors(updatedErrors);
  };

  const errorContextValue = useMemo<IErrorContextValue>(
    () => ({
      errors,
      setNewLengthError,
      setNewInputError,
      clearErrors,
      clearError,
    }),
    [errors]
  );

  return (
    <ErrorContext.Provider value={errorContextValue}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
