import { useEffect, useState, useMemo } from 'react';
import { TimerContext, ITimerContextValue } from '../../context/TimerContext';
import { BREAK_TIMER } from '../../lib/util';
import { IProviderProps } from './types';
import { getLocalStorage } from '../../lib/storage';

const TimerProvider = ({ children }: IProviderProps): React.ReactElement => {
  const [breakLength, setBreakLength] = useState<number>(5);
  const [breakSeconds, setBreakSeconds] = useState<number>(breakLength * 60);
  const [isBreakActive, setIsBreakActive] = useState<boolean>(false);

  const [sessionLength, setSessionLength] = useState<number>(25);
  const [sessionSeconds, setSessionSeconds] = useState<number>(sessionLength * 60);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);

  useEffect(() => {
    const {
      localStorageBreakTimer,
      localStorageSessionTimer,
      activeTimer,
    } = getLocalStorage();
    
    if (localStorageBreakTimer) setBreakSeconds(localStorageBreakTimer);
    if (localStorageSessionTimer) setSessionSeconds(localStorageSessionTimer);

    if (activeTimer) {
      activeTimer === BREAK_TIMER
        ? setIsBreakActive(true)
        : setIsSessionActive(true);
    }
  }, []);

  const timerState = useMemo<ITimerContextValue>(
    () => ({
      breakTimer: {
        length: breakLength,
        setLength: setBreakLength,
        seconds: breakSeconds,
        setSeconds: setBreakSeconds,
        isActive: isBreakActive,
        setIsActive: setIsBreakActive,
      },
      sessionTimer: {
        length: sessionLength,
        setLength: setSessionLength,
        seconds: sessionSeconds,
        setSeconds: setSessionSeconds,
        isActive: isSessionActive,
        setIsActive: setIsSessionActive,
      },
    }),
    [
      breakLength,
      breakSeconds,
      isBreakActive,
      sessionLength,
      sessionSeconds,
      isSessionActive,
    ]
  );

  return (
    <TimerContext.Provider value={timerState}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
