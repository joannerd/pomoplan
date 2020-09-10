import { useEffect, useMemo, useReducer } from 'react';
import {
  IGoal,
  IGoals,
  GoalContext,
  IGoalContextValue,
  GoalProperty,
  GoalValue,
} from '../../context/GoalContext';
import { IProviderProps, GoalActionType, IGoalAction } from './types';
import { getLocalStorage, setLocalStorage } from '../../lib/storage';
import { GOALS } from '../../lib/util';

const goalReducer = (goals: IGoals, action: IGoalAction): IGoals => {
  switch (action.type) {
    case GoalActionType.CREATE_GOAL: {
      const { id, startDate, description } = action;
      return {
        ...goals,
        [id]: {
          id,
          startDate,
          description,
          endDate: '',
          isFinished: false,
          lastActiveDate: '',
          currentStreak: 0,
          overallStreak: 0,
        }
      };
    }
    case GoalActionType.UPDATE_GOAL: {
      const { id, key, value } = action;
      return {
        ...goals,
        [id]: {
          ...goals[id],
          [key]: value,
        },
      };
    }
    case GoalActionType.DELETE_GOAL: {
      const goalsWithDeletion = { ...goals };
      delete goalsWithDeletion[action.id];
      return goalsWithDeletion;
    }
    case GoalActionType.FINISH_GOAL: {
      const { id, lastActiveDate, endDate } = action;
      return {
        ...goals,
        [id]: {
          ...goals[id],
          isFinished: true,
          lastActiveDate,
          endDate,
        },
      };
    }
    case GoalActionType.UPDATE_STREAK: {
      const { id, step, lastActiveDate } = action;
      const goalToUpdate: IGoal = goals[id];
      const isNewGoal = goalToUpdate.lastActiveDate === '';
      const lastActiveDateValue = new Date(goalToUpdate.lastActiveDate).valueOf();
      const currentDateValue = new Date().valueOf();
      const isConsecutive: boolean =
        isNewGoal || lastActiveDateValue - currentDateValue <= 1;

      return {
        ...goals,
        [id]: {
          ...goalToUpdate,
          currentStreak: isConsecutive ? goalToUpdate.currentStreak + step : 1,
          overallStreak: goalToUpdate.overallStreak + step,
          lastActiveDate,
        },
      };
    }
    default:
      return goals;
  }
};

const GoalProvider = ({ children }: IProviderProps): React.ReactElement => {
  const { localStorageGoals } = getLocalStorage();
  const [goals, dispatch] = useReducer(goalReducer, localStorageGoals);
  const today: string = new Date().toDateString();

  useEffect(() => {
    setLocalStorage(GOALS, goals);
  }, [goals]);

  const createGoal = (description: string): void => {
    const id: number = Date.now();
    dispatch({
      type: GoalActionType.CREATE_GOAL,
      id,
      startDate: today,
      description,
    });
  };

  const updateGoal = (
    id: number,
    key: GoalProperty,
    value: GoalValue,
  ): void => {
    dispatch({
      type: GoalActionType.UPDATE_GOAL,
      id,
      key,
      value,
    });
  };

  const deleteGoal = (id: number): void => {
    dispatch({
      type: GoalActionType.DELETE_GOAL,
      id,
    });
  };

  const finishGoal = (id: number): void => {
    dispatch({
      type: GoalActionType.FINISH_GOAL,
      id,
      lastActiveDate: today,
      endDate: today,
    });
  };

  const incrementStreak = (id: number): void => {
    dispatch({
      type: GoalActionType.UPDATE_STREAK,
      id,
      step: 1,
      lastActiveDate: today,
    });
  };

  const decrementStreak = (id: number): void => {
    const goal: IGoal = goals[id];
    if (goal.currentStreak > 0) {
      dispatch({
        type: GoalActionType.UPDATE_STREAK,
        id,
        step: -1,
        lastActiveDate: '',
      });
    }
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
