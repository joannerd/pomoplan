import { useEffect, useState, useMemo } from 'react';
import {
  IGoal,
  IGoals,
  GoalContext,
  IGoalContextValue,
  GoalProperty,
  GoalValue,
} from '../../context/GoalContext';
import { IProviderProps } from './types';
import { getLocalStorage, setLocalStorage } from '../../lib/storage';
import { GOALS } from '../../lib/util';

const GoalProvider = ({ children }: IProviderProps): React.ReactElement => {
  const [goals, setGoals] = useState<IGoals>({});
  const today: string = new Date().toDateString();

  useEffect(() => {
    const { localStorageGoals } = getLocalStorage();
    setGoals(localStorageGoals);
  }, []);

  const createGoal = (description: string): void => {
    const id: number = Date.now();
    const updatedGoals = { ...goals };
    updatedGoals[id] = {
      id,
      description,
      isFinished: false,
      startDate: today,
      endDate: '',
      lastActiveDate: '',
      currentStreak: 0,
      overallStreak: 0,
    };

    updateStoredGoals(updatedGoals);
  };

  const updateGoal = (
    id: number,
    key: GoalProperty,
    value: GoalValue,
  ): void => {
    const goalToUpdate: IGoal = { ...goals[id], [key]: value };
    const updatedGoals: IGoals = { ...goals, [id]: goalToUpdate };
    updateStoredGoals(updatedGoals);
  };

  const deleteGoal = (id: number): void => {
    const goalsWithDeletion = { ...goals };
    delete goalsWithDeletion[id];
    updateStoredGoals(goalsWithDeletion);
  };

  const finishGoal = (id: number): void => {
    const goalToUpdate: IGoal = goals[id];
    const updatedGoal: IGoal = {
      ...goalToUpdate,
      isFinished: true,
      lastActiveDate: today,
      endDate: today,
    };
    const updatedGoals: IGoals = { ...goals, [id]: updatedGoal };
    updateStoredGoals(updatedGoals);
  };

  const incrementStreak = (id: number): void => {
    updateStreak(id, 1);
  };

  const decrementStreak = (id: number): void => {
    if (goals[id].currentStreak > 0) updateStreak(id, -1, '');
  };

  const updateStreak = (
    id: number,
    step: number,
    lastActiveDate: string = today,
  ): void => {
    const goalToUpdate: IGoal = goals[id];
    const isConsecutive: boolean =
      new Date(goalToUpdate.lastActiveDate).valueOf() - new Date().valueOf() <= 1;

    const updatedGoal: IGoal = {
      ...goalToUpdate,
      currentStreak: isConsecutive ? goalToUpdate.currentStreak + step : 0,
      overallStreak: goalToUpdate.overallStreak + step,
      lastActiveDate,
    };
    const updatedGoals: IGoals = { ...goals, [id]: updatedGoal };
    updateStoredGoals(updatedGoals);
  };

  const updateStoredGoals = (updatedGoals: IGoals): void => {
    setLocalStorage(GOALS, updatedGoals);
    setGoals(updatedGoals);
  };

  const goalState = useMemo<IGoalContextValue>(
    () => ({
      goals,
      createGoal,
      deleteGoal,
      updateGoal,
      finishGoal,
      incrementStreak,
      decrementStreak,
    }),
    [goals]
  );

  return (
    <GoalContext.Provider value={goalState}>
      {children}
    </GoalContext.Provider>
  );
};

export default GoalProvider;
