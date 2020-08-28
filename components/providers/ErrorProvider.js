import { useState, useMemo } from 'react';
import { ErrorContext } from '../../lib/context';
import { types, lengthError, inputError } from '../../lib/errors';

const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState({});

  const setNewLengthError = (type, minOrMax, length) => {
    const newError = lengthError(type, minOrMax, length);
    setErrors((errors) => ({ ...errors, ...newError }));
  };

  const setNewInputError = (type) => {
    const newError = inputError(type);
    setErrors((errors) => ({ ...errors, ...newError }));
  };

  const clearErrors = () => setErrors([]);
  const clearError = (id) => {
    const updatedErrors = { ...errors };
    delete updatedErrors[id];
    setErrors(updatedErrors);
  };

  const errorState = useMemo(() => ({
    errors,
    types,
    setNewLengthError,
    setNewInputError,
    clearErrors,
    clearError,
  }), [errors]);

  return (
    <ErrorContext.Provider value={errorState}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
