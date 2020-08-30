import React, { useState, FormEvent } from 'react';
import { useTask } from '../context/TaskContext';

const TaskForm = (): React.ReactElement => {
  const [description, setDescription] = useState<string>('');
  const { createTask } = useTask();

  const handleInputChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
    setDescription(e.target.value as string);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createTask(description);
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
        placeholder="Add a task"
        value={description}
        onChange={handleInputChange}
        required
      />
    </form>
  );
};

export default TaskForm;
