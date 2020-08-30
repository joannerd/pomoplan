import { useEffect } from 'react';
import { useError } from '../context/ErrorContext';

const ValidationErrors = (): React.ReactElement => {
  const { errors, clearErrors, clearError } = useError();

  useEffect(() => {
    if (Object.keys(errors).length) clearErrors();
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
