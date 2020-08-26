import { createContext } from 'react';
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
