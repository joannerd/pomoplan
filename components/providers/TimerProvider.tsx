import { useEffect, useState, useMemo } from 'react';
import { TimerContext, ITimerContextValue } from '../../context/TimerContext';
import { BREAK_TIMER, SESSION_TIMER, ACTIVE_TIMER } from '../../lib/util';
import { IProviderProps } from './types';

const TimerProvider = ({ children }: IProviderProps): React.ReactElement => {
  const [breakLength, setBreakLength] = useState<number>(5);
  const [breakSeconds, setBreakSeconds] = useState<number>(breakLength * 60);
  const [isBreakActive, setIsBreakActive] = useState<boolean>(false);

  const [sessionLength, setSessionLength] = useState<number>(25);
  const [sessionSeconds, setSessionSeconds] = useState<number>(sessionLength * 60);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);

  useEffect(() => {
    loadStoredTimers();
    return () => updateStoredTimers();
  }, []);

  const loadStoredTimers = (): void => {
    const localStorageBreakTimer = localStorage.getItem(BREAK_TIMER);
    const localStorageSessionTimer = localStorage.getItem(SESSION_TIMER);
    if (localStorageBreakTimer) {
      const storedBreakSeconds = JSON.parse(localStorageBreakTimer);
      setBreakSeconds(storedBreakSeconds);
    }

    if (localStorageSessionTimer) {
      const storedSessionSeconds = JSON.parse(localStorageSessionTimer);
      setSessionSeconds(storedSessionSeconds);
    }

    const activeTimer = localStorage.getItem(ACTIVE_TIMER);
    if (activeTimer !== 'null') {
      activeTimer === BREAK_TIMER
        ? setIsBreakActive(true)
        : setIsSessionActive(true);
    }
  };

  const updateStoredTimers = (): void => {
    let activeTimer: string = 'null';

    if (isBreakActive) {
      activeTimer = BREAK_TIMER;
    } else if (isSessionActive) {
      activeTimer = SESSION_TIMER;
    }

    localStorage.setItem(BREAK_TIMER, breakSeconds.toString());
    localStorage.setItem(SESSION_TIMER, sessionSeconds.toString());
    localStorage.setItem(ACTIVE_TIMER, activeTimer);
  };

  const removeStoredTimers = (): void => {
    localStorage.removeItem(BREAK_TIMER);
    localStorage.removeItem(SESSION_TIMER);
    localStorage.removeItem(ACTIVE_TIMER);
  };

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
      updateStoredTimers,
      removeStoredTimers,
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
