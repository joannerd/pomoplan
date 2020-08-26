import { useState, useMemo } from 'react';
import { ErrorContext, ErrorContextValueType } from '../../lib/context';
import { types, lengthError, inputError, Error, ErrorType } from '../../lib/errors';

type ErrorProviderProps = {
  children: React.ReactNode;
};

type Errors = {
  [id: number]: Error;
};

const ErrorProvider = ({ children }: ErrorProviderProps): React.ReactElement => {
  const [errors, setErrors] = useState<Errors>({});

  const setNewLengthError = (type: ErrorType, minOrMax: string, length: number): void => {
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

  const errorContextValue: ErrorContextValueType = useMemo(() => ({
    errors,
    types: ErrorType,
    setNewLengthError,
    setNewInputError,
    clearErrors,
    clearError,
  }), [errors]);

  return (
    <ErrorContext.Provider value={errorContextValue}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
