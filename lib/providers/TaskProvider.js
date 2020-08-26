import { useEffect, useState, useMemo } from 'react';
import { TaskContext } from '../context';
import { TASKS } from '../util';

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});
  const numTasks = Object.keys(tasks).length;

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(TASKS));
    if (storedTasks) setTasks(storedTasks);
  }, [])

  const createTask = (description) => {
    const id = new Date().getTime();
    const updatedTasks = { ...tasks };
    updatedTasks[id] = {
      id,
      description,
      isDone: false,
      isArchived: false,
      order: numTasks + 1,
    };

    updateStoredTasks(updatedTasks);
  };

  const updateTask = (id, key, value) => {
    const updatedTasks = { ...tasks };
    updatedTasks[id][key] = value;
    updateStoredTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const tasksWithDeletion = { ...tasks };
    delete tasksWithDeletion[id];
    updateStoredTasks(tasksWithDeletion);
  };

  const updateStoredTasks = (updatedTasks) => {
    const jsonTasks = JSON.stringify(updatedTasks);
    localStorage.setItem(TASKS, jsonTasks);
    setTasks(updatedTasks);
  };

  const taskState = useMemo(() => ({
    tasks,
    createTask,
    deleteTask,
    updateTask,
  }), [tasks]);

  return (
    <TaskContext.Provider value={taskState}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
