import { createContext, useContext } from 'react';

export interface IGoal {
  id: number;
  description: string;
  isFinished: boolean;
  startDate: string;
  endDate: string;
  lastActiveDate: string;
  currentStreak: number;
  overallStreak: number;
};

export enum GoalProperty {
  description = 'description',
  startDate = 'startDate',
  endDate = 'endDate',
  lastActiveDate = 'lastActiveDate',
  currentStreak = 'currentStreak',
  overallStreak = 'overallStreak',
  isFinished = 'isFinished',
};

export type GoalValue = boolean | string;

export interface IGoals {
  [id: number]: IGoal;
};

export interface IGoalContextValue {
  goals: IGoals;
  createGoal: (description: string) => void;
  updateGoal: (id: number, key: GoalProperty, value: GoalValue) => void;
  deleteGoal: (id: number) => void;
  finishGoal: (id: number) => void;
  incrementStreak: (id: number) => void;
  decrementStreak: (id: number) => void;
};

export const GoalContext = createContext<IGoalContextValue>({
  goals: {},
  createGoal: () => {},
  deleteGoal: () => {},
  updateGoal: () => {},
  finishGoal: () => {},
  incrementStreak: () => {},
  decrementStreak: () => {},
});

export const useGoal = (): IGoalContextValue => {
  const {
    goals,
    createGoal,
    deleteGoal,
    updateGoal,
    finishGoal,
    incrementStreak,
    decrementStreak,
  } = useContext(GoalContext);

  return {
    goals,
    createGoal,
    deleteGoal,
    updateGoal,
    finishGoal,
    incrementStreak,
    decrementStreak,
  };
};

