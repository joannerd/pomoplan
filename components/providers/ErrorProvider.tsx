import { useState, useMemo } from 'react';
import {
  ErrorContext,
  ErrorContextValue,
  Errors,
  ErrorType,
} from '../../context/ErrorContext';
import { lengthError, inputError } from '../../lib/errors';
import { ProviderProps } from './types';

const ErrorProvider = ({ children }: ProviderProps): React.ReactElement => {
  const [errors, setErrors] = useState<Errors>({});

  const setNewLengthError = (
    type: ErrorType,
    minOrMax: string,
    length: number
  ): void => {
    const newError = lengthError(type, minOrMax, length);
    setErrors((errors) => ({ ...errors, ...newError }));
  };

  const setNewInputError = (type: ErrorType): void => {
    const newError = inputError(type);
    setErrors((errors) => ({ ...errors, ...newError }));
  };

  const clearErrors = (): void => setErrors({});

  const clearError = (id: number): void => {
    const updatedErrors = { ...errors };
    delete updatedErrors[id];
    setErrors(updatedErrors);
  };

  const errorContextValue: ErrorContextValue = useMemo(
    () => ({
      errors,
      types: ErrorType,
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
