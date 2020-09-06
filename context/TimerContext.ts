import { createContext, useContext, Dispatch, SetStateAction } from 'react';

export interface ITimer {
  length: number;
  seconds: number;
  isActive: boolean;
  setLength: Dispatch<SetStateAction<number>>;
  setSeconds: Dispatch<SetStateAction<number>>;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};

export interface ITimerContextValue {
  breakTimer: ITimer;
  sessionTimer: ITimer;
  updateStoredTimers: () => void;
};

export const TimerContext = createContext<ITimerContextValue>({
  breakTimer: {
    length: 5,
    seconds: 300,
    isActive: false,
    setLength: () => {},
    setSeconds: () => {},
    setIsActive: () => {},
  },
  sessionTimer: {
    length: 25,
    seconds: 1500,
    isActive: false,
    setLength: () => {},
    setSeconds: () => {},
    setIsActive: () => {},
  },
  updateStoredTimers: () => {},
});

export const useTimer = (): ITimerContextValue => {
  const {
    breakTimer,
    sessionTimer,
    updateStoredTimers,
  } = useContext(TimerContext);

  return {
    breakTimer,
    sessionTimer,
    updateStoredTimers,
  };
};
