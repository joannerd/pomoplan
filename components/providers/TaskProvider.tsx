import { useEffect, useState, useMemo } from 'react';
import { TaskContext, Tasks, TaskContextValue } from '../../context/TaskContext';
import { TASKS } from '../../lib/util';
import { ProviderProps } from './types';

const TaskProvider = ({ children }: ProviderProps): React.ReactElement => {
  const [tasks, setTasks] = useState<Tasks>({});
  const numTasks: number = Object.keys(tasks).length;

  useEffect(() => {
    const storedTasks: Tasks = JSON.parse(localStorage.getItem(TASKS));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  const createTask = (description: string): void => {
    const id: number = new Date().getTime();
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

  const updateTask = (id: number, key: string, value: string): void => {
    const updatedTasks = { ...tasks };
    updatedTasks[id][key] = value;
    updateStoredTasks(updatedTasks);
  };

  const deleteTask = (id: number): void => {
    const tasksWithDeletion = { ...tasks };
    delete tasksWithDeletion[id];
    updateStoredTasks(tasksWithDeletion);
  };

  const updateStoredTasks = (updatedTasks: Tasks): void => {
    const jsonTasks: string = JSON.stringify(updatedTasks);
    localStorage.setItem(TASKS, jsonTasks);
    setTasks(updatedTasks);
  };

  const taskState: TaskContextValue = useMemo(
    () => ({
      tasks,
      createTask,
      deleteTask,
      updateTask,
    }),
    [tasks]
  );

  return (
    <TaskContext.Provider value={taskState}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
