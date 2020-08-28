import { useEffect, useState, useMemo } from 'react';
import { TimerContext, TimerContextValue } from '../../context/TimerContext';
import { BREAK_TIMER, SESSION_TIMER, ACTIVE_TIMER } from '../../lib/util';
import { ProviderProps } from './types';

const TimerProvider = ({ children }: ProviderProps): React.ReactElement => {
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
    const storedBreakSeconds = JSON.parse(localStorage.getItem(BREAK_TIMER));
    const storedSessionSeconds = JSON.parse(
      localStorage.getItem(SESSION_TIMER)
    );
    const activeTimer: string = localStorage.getItem(ACTIVE_TIMER);
    if (storedBreakSeconds) setBreakSeconds(storedBreakSeconds);
    if (storedSessionSeconds) setSessionSeconds(storedSessionSeconds);
    if (activeTimer !== 'null') {
      activeTimer === BREAK_TIMER
        ? setIsBreakActive(true)
        : setIsSessionActive(true);
    }
  };

  const updateStoredTimers = (): void => {
    let activeTimer: string | null = null;

    if (isBreakActive) {
      activeTimer = BREAK_TIMER;
    } else if (isSessionActive) {
      activeTimer = SESSION_TIMER;
    }

    localStorage.setItem(BREAK_TIMER, breakSeconds.toString());
    localStorage.setItem(SESSION_TIMER, sessionSeconds.toString());
    localStorage.setItem(ACTIVE_TIMER, activeTimer);
  };
// Dispatch<SetStateAction<number>>
  const removeStoredTimers = (): void => {
    localStorage.removeItem(BREAK_TIMER);
    localStorage.removeItem(SESSION_TIMER);
    localStorage.removeItem(ACTIVE_TIMER);
  };

  const timerState: TimerContextValue = useMemo(
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
