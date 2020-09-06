import React, { useState, FormEvent } from 'react';

interface ICreationFormProps {
  createItem: (input: string) => void;
  placeholderText: string;
};

const CreationForm = ({ createItem, placeholderText }: ICreationFormProps): React.ReactElement => {
  const [description, setDescription] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
    setDescription(e.target.value as string);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createItem(description);
    setDescription('');
  };

  return (
    <form
      id="task-form"
      onSubmit={handleSubmit}
      className="flex-column-centered"
    >
      <input
        type="text"
        placeholder={placeholderText}
        value={description}
        onChange={handleInputChange}
        required
      />
    </form>
  );
};

export default CreationForm;
