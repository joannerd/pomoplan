import React, { useState, useContext } from 'react';
import { TaskContext } from '../lib/context';

const TaskForm = () => {
  const [description, setDescription] = useState('');
  const { createTask } = useContext(TaskContext);
  const handleInputChange = (e) => setDescription(e.target.value);

  const handleSubmit = (e) => {
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
