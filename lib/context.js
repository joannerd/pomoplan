import { createContext, useContext } from 'react';
import { types } from './errors';

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

export const ErrorContext = createContext({
  errors: {},
  types,
  setNewInputError: () => {},
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
  } = useContext(ErrorContext);

  return {
    errors,
    types,
    setNewLengthError,
    setNewInputError,
    clearErrors,
  };
};
