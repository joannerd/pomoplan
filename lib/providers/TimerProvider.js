import { useEffect, useState, useMemo } from 'react';
import { TimerContext } from '../context';
import { BREAK_TIMER, SESSION_TIMER, ACTIVE_TIMER } from '../util';

const TimerProvider = ({ children }) => {
  const [breakLength, setBreakLength] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(breakLength * 60);
  const [isBreakActive, setIsBreakActive] = useState(false);

  const [sessionLength, setSessionLength] = useState(25);
  const [sessionSeconds, setSessionSeconds] = useState(sessionLength * 60);
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    loadStoredTimers();
    return () => updateStoredTimers();
  }, [])

  const loadStoredTimers = () => {
    const storedBreakSeconds = JSON.parse(localStorage.getItem(BREAK_TIMER));
    const storedSessionSeconds = JSON.parse(localStorage.getItem(SESSION_TIMER));
    const activeTimer = localStorage.getItem(ACTIVE_TIMER);
    if (storedBreakSeconds) setBreakSeconds(storedBreakSeconds);
    if (storedSessionSeconds) setSessionSeconds(storedSessionSeconds);
    if (activeTimer !== 'null') {
      activeTimer === BREAK_TIMER
        ? setIsBreakActive(true)
        : setIsSessionActive(true);
    }
  };

  const updateStoredTimers = () => {
    let activeTimer = null;
    if (isBreakActive) {
      activeTimer = BREAK_TIMER;
    } else if (isSessionActive) {
      activeTimer = SESSION_TIMER;
    }

    localStorage.setItem(BREAK_TIMER, breakSeconds);
    localStorage.setItem(SESSION_TIMER, sessionSeconds);
    localStorage.setItem(ACTIVE_TIMER, activeTimer);
  };

  const removeStoredTimers = () => {
    localStorage.removeItem(BREAK_TIMER);
    localStorage.removeItem(SESSION_TIMER);
    localStorage.removeItem(ACTIVE_TIMER);
  };

  const timerState = useMemo(() => ({
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
  }), [
    breakLength,
    breakSeconds,
    isBreakActive,
    sessionLength,
    sessionSeconds,
    isSessionActive,
  ]);

  return (
    <TimerContext.Provider value={timerState}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
