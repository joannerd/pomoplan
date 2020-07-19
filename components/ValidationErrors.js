import { useContext, useEffect } from 'react';
import { ErrorContext } from '../lib/context';

const ValidationErrors = () => {
  const { errors, clearErrors, clearError } = useContext(ErrorContext);

  useEffect(() => {
    if (errors.length) clearErrors();
  }, []);

  return (
    <ul>
      {Object.values(errors).map(({ id, message }) => (
        <li key={id} onClick={() => clearError(id)} className="error">
          {message}
        </li>
      ))}
    </ul>
  );
};

export default ValidationErrors;
