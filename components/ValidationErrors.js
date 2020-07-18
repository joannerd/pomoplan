
const ValidationErrors = ({ errors, clearError }) => (
  <ul id="errors">
    {errors.map(({ id, message }) => (
      <li key={id} onClick={() => clearError(id)}>
        {message}
      </li>
    ))}
  </ul>
);

export default ValidationErrors;
