import { GOALS, TASKS, BREAK_TIMER, SESSION_TIMER, ACTIVE_TIMER } from './util';
import { ITasks } from '../context/TaskContext';
import { IGoals } from '../context/GoalContext';

interface ILocalStorage {
  localStorageTasks: ITasks,
  localStorageGoals: IGoals,
  localStorageBreakTimer: number,
  localStorageSessionTimer: number,
  activeTimer: string,
}

export const getLocalStorage = (): ILocalStorage => {
  const localStorageTasks = localStorage.getItem(TASKS) || 'null';
  const localStorageGoals = localStorage.getItem(GOALS) || 'null';
  const localStorageBreakTimer = localStorage.getItem(BREAK_TIMER) || 'null';
  const localStorageSessionTimer = localStorage.getItem(SESSION_TIMER) || 'null';
  const activeTimer = localStorage.getItem(ACTIVE_TIMER) || 'null';

  return {
    localStorageTasks: JSON.parse(localStorageTasks) || {},
    localStorageGoals: JSON.parse(localStorageGoals) || {},
    localStorageBreakTimer: JSON.parse(localStorageBreakTimer) || 0,
    localStorageSessionTimer: JSON.parse(localStorageSessionTimer) || 0,
    activeTimer: JSON.parse(activeTimer) || '',
  };
};

export const setLocalStorage = (name: string, item: ITasks | IGoals | number | string): void => {
  const jsonItem: string = JSON.stringify(item);
  localStorage.setItem(name, jsonItem);
};

export const removeStoredTimers = (): void => {
  localStorage.removeItem(BREAK_TIMER);
  localStorage.removeItem(SESSION_TIMER);
  localStorage.removeItem(ACTIVE_TIMER);
};
