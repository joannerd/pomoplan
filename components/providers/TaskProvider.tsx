import { useEffect, useMemo, useReducer } from 'react';
import {
  ITask,
  ITasks,
  TaskContext,
  ITaskContextValue,
  TaskProperty,
  TaskValue,
} from '../../context/TaskContext';
import { TASKS } from '../../lib/util';
import { IProviderProps, TaskActionType, ITaskAction } from './types';
import { getLocalStorage, setLocalStorage } from '../../lib/storage';

const taskReducer = (tasks: ITasks, action: ITaskAction): ITasks => {
  switch (action.type) {
    case TaskActionType.CREATE_TASK: {
      const { id, order, description } = action;
      return {
        ...tasks,
        [id]: {
          id,
          order,
          description,
          isDone: false,
          isArchived: false,
        },
      };
    }
    case TaskActionType.UPDATE_TASK: {
      const { id, key, value } = action;
      return {
        ...tasks,
        [id]: {
          ...tasks[id],
          [key]: value
        },
      };
    }
    case TaskActionType.DELETE_TASK: {
      const tasksWithDeletion = { ...tasks };
      delete tasksWithDeletion[action.id];
      return tasksWithDeletion;
    }
    default:
      return tasks;
  }
};

const TaskProvider = ({ children }: IProviderProps): React.ReactElement => {
  const { localStorageTasks } = getLocalStorage();
  const [tasks, dispatch] = useReducer(taskReducer, localStorageTasks);

  useEffect(() => {
    setLocalStorage(TASKS, tasks);
  }, [tasks]);

  const createTask = (description: string): void => {
    const id: number = Date.now();
    const numTasks: number = Object.keys(tasks).length;
    dispatch({
      type: TaskActionType.CREATE_TASK,
      id,
      description,
      order: numTasks + 1,
    });
  };

  const updateTask = (
    id: number,
    key: TaskProperty,
    value: TaskValue,
  ): void => {
    dispatch({
      type: TaskActionType.UPDATE_TASK,
      id,
      key,
      value,
    });
  };

  const deleteTask = (id: number): void => {
    dispatch({
      type: TaskActionType.DELETE_TASK,
      id,
    });
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
