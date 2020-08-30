import { createContext, useContext } from 'react';

export interface ITask {
  id: number;
  description: string;
  isDone: boolean;
  isArchived: boolean;
  order: number;
};

export interface ITasks {
  [id: number]: ITask;
};

export enum TaskProperty {
  isArchived = 'isArchived',
  isDone = 'isDone',
  order = 'order',
  description = 'description',
};

export type TaskValue = boolean | string;

export interface ITaskContextValue {
  tasks: {
    [id: number]: ITask;
  };
  createTask: (description: string) => void;
  updateTask: (id: number, key: TaskProperty, value: boolean | string) => void;
  deleteTask: (id: number) => void;
};

export const TaskContext = createContext<ITaskContextValue>({
  tasks: {},
  createTask: () => {},
  deleteTask: () => {},
  updateTask: () => {},
});

export const useTask = (): ITaskContextValue => {
  const { tasks, createTask, deleteTask, updateTask } = useContext(TaskContext);

  return {
    tasks,
    createTask,
    deleteTask,
    updateTask,
  };
};

