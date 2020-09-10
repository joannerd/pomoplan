import { TaskProperty, TaskValue } from '../../context/TaskContext';
import { GoalProperty, GoalValue } from '../../context/GoalContext';

export interface IProviderProps {
  children: React.ReactNode;
};

export enum TaskActionType {
  CREATE_TASK = 'CREATE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
};

interface CreateTask {
  type: TaskActionType.CREATE_TASK;
  id: number;
  order: number;
  description: string;
};

interface UpdateTask {
  type: TaskActionType.UPDATE_TASK;
  id: number;
  key: TaskProperty;
  value: TaskValue;
};

interface DeleteTask {
  type: TaskActionType.DELETE_TASK;
  id: number;
};

export type ITaskAction = CreateTask | UpdateTask | DeleteTask;

export enum GoalActionType {
  CREATE_GOAL = 'CREATE_GOAL',
  UPDATE_GOAL = 'UPDATE_GOAL',
  DELETE_GOAL = 'DELETE_GOAL',
  FINISH_GOAL = 'FINISH_GOAL',
  UPDATE_STREAK = 'UPDATE_STREAK',
};

interface CreateGoal {
  type: GoalActionType.CREATE_GOAL;
  id: number;
  startDate: string;
  description: string;
};

interface UpdateGoal {
  type: GoalActionType.UPDATE_GOAL;
  id: number;
  key: GoalProperty;
  value: GoalValue;
};

interface DeleteGoal {
  type: GoalActionType.DELETE_GOAL;
  id: number;
};

interface FinishGoal {
  type: GoalActionType.FINISH_GOAL;
  id: number;
  endDate: string;
  lastActiveDate: string;
};

interface UpdateStreak {
  type: GoalActionType.UPDATE_STREAK;
  id: number;
  step: number;
  lastActiveDate: string;
};

export type IGoalAction = CreateGoal | UpdateGoal | DeleteGoal | FinishGoal | UpdateStreak;

