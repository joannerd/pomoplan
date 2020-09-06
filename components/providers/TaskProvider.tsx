import { useEffect, useState, useMemo } from 'react';
import {
  ITask,
  ITasks,
  TaskContext,
  ITaskContextValue,
  TaskProperty,
  TaskValue,
} from '../../context/TaskContext';
import { TASKS } from '../../lib/util';
import { IProviderProps } from './types';
import { getLocalStorage, setLocalStorage } from '../../lib/storage';

// const taskReducer = (state, action)

const TaskProvider = ({ children }: IProviderProps): React.ReactElement => {
  const [tasks, setTasks] = useState<ITasks>({});
  const numTasks: number = Object.keys(tasks).length;

  useEffect(() => {
    const { localStorageTasks } = getLocalStorage();
    setTasks(localStorageTasks);
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

  const updateTask = (
    id: number,
    key: TaskProperty,
    value: TaskValue,
  ): void => {
    const taskToUpdate: ITask = { ...tasks[id], [key]: value };
    const updatedTasks: ITasks = { ...tasks, [id]: taskToUpdate };
    updateStoredTasks(updatedTasks);
  };

  const deleteTask = (id: number): void => {
    const tasksWithDeletion = { ...tasks };
    delete tasksWithDeletion[id];
    updateStoredTasks(tasksWithDeletion);
  };

  const updateStoredTasks = (updatedTasks: ITasks): void => {
    setLocalStorage(TASKS, updatedTasks);
    setTasks(updatedTasks);
  };

  const taskState = useMemo<ITaskContextValue>(
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
