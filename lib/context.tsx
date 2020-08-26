import { createContext, useContext } from 'react';
import { types, Error } from './errors';

export type ErrorContextValueType = {
  errors: {
    [id: number]: Error;
  };
  types: {
    SESSION: string;
    BREAK: string;
    MAX: string;
    MIN: string;
  }
  setNewLengthError: () => void;
  setNewInputError: () => void;
  clearErrors: () => void;
  clearError: () => void;
};

export const TaskContext = createContext({
  tasks: {},
  createTask: () => {},
  deleteTask: () => {},
  updateTask: () => {},
});

export const TimerContext = createContext({
  breakTimer: {
    length: 5,
    seconds: 300,
    isActive: false,
    setLength: () => { },
    setSeconds: () => { },
    setIsActive: () => { },
  },
  sessionTimer: {
    length: 25,
    seconds: 1500,
    isActive: false,
    setLength: () => { },
    setSeconds: () => { },
    setIsActive: () => { },
  },
  updateStoredTimers: () => {},
  removeStoredTimers: () => {},
});

export const ErrorContext: React.Context<ErrorContextValueType> = createContext<ErrorContextValueType>({
  errors: {},
  types,
  setNewLengthError: () => {},
  setNewInputError: () => {},
  clearErrors: () => {},
  clearError: () => {},
});

export const useTask = () => {
  const {
    tasks,
    createTask,
    deleteTask,
    updateTask,
  } = useContext(TaskContext);

  return {
    tasks,
    createTask,
    deleteTask,
    updateTask,
  };
};

export const useTimer = () => {
  const {
    breakTimer,
    sessionTimer,
    updateStoredTimers,
    removeStoredTimers,
  } = useContext(TimerContext);

  return {
    breakTimer,
    sessionTimer,
    updateStoredTimers,
    removeStoredTimers,
  };
};

export const useError = () => {
  const {
    errors,
    types,
    setNewLengthError,
    setNewInputError,
    clearErrors,
    clearError,
  } = useContext(ErrorContext);

  return {
    errors,
    types,
    setNewLengthError,
    setNewInputError,
    clearErrors,
    clearError,
  };
};
