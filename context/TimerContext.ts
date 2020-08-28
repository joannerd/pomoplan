import { createContext, useContext, Dispatch, SetStateAction } from 'react';


export interface TimerContextValue {
  breakTimer: {
    length: number;
    seconds: number;
    isActive: boolean;
    setLength: Dispatch<SetStateAction<number>>;
    setSeconds: Dispatch<SetStateAction<number>>;
    setIsActive: Dispatch<SetStateAction<boolean>>;
  };
  sessionTimer: {
    length: number;
    seconds: number;
    isActive: boolean;
    setLength: Dispatch<SetStateAction<number>>;
    setSeconds: Dispatch<SetStateAction<number>>;
    setIsActive: Dispatch<SetStateAction<boolean>>;
  };
  updateStoredTimers: () => void;
  removeStoredTimers: () => void;
};

export const TimerContext = createContext<TimerContextValue>({
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
  removeStoredTimers: () => {},
});

export const useTimer = (): TimerContextValue => {
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
