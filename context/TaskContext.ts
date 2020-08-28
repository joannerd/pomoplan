import { createContext, useContext } from 'react';

export interface Task {
  id: number;
  description: string;
  isDone: boolean;
  isArchived: boolean;
  order: number;
};

export interface Tasks {
  [id: number]: Task;
};

export interface TaskContextValue {
  tasks: {
    [id: number]: Task;
  };
  createTask: (description: string) => void;
  updateTask: (id: number, key: string, value: string) => void;
  deleteTask: (id: number) => void;
};

export const TaskContext = createContext<TaskContextValue>({
  tasks: {},
  createTask: () => {},
  deleteTask: () => {},
  updateTask: () => {},
});

export const useTask = (): TaskContextValue => {
  const { tasks, createTask, deleteTask, updateTask } = useContext(TaskContext);

  return {
    tasks,
    createTask,
    deleteTask,
    updateTask,
  };
};

