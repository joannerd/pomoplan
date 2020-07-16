import { useState, useEffect, useContext } from 'react';
import { TimerContext } from './context';
import Stopwatch from './Stopwatch';

const TimerBar = () => {
  const {
    breakLength,
    setBreakLength,
    sessionLength,
    setSessionLength,
    breakSeconds,
    setBreakSeconds,
    sessionSeconds,
    setSessionSeconds,
    removeStoredTimers,
    isBreakActive,
    setIsBreakActive,
    isSessionActive,
    setIsSessionActive,
  } = useContext(TimerContext);
  const [sessionNumber, setSessionNumber] = useState(1);
  const updateSession = (e) => setSessionLength(e.target.value);

  const reset = () => {
    removeStoredTimers();
    setIsBreakActive(false);
    setIsSessionActive(false);
    setBreakSeconds(breakLength * 60);
    setSessionSeconds(sessionLength * 60);
  };

  useEffect(() => {
    if (sessionNumber === 4) {
      setBreakLength(15);
      setSessionNumber(1);
    };
  }, [sessionNumber])

  return (
    <div id="clock">
      <div>
        <h2>Session</h2>
        <input
          type="number"
          value={sessionLength}
          onChange={updateSession}
          min="20"
          max="30"
          required
        />
      </div>

      <Stopwatch
        type="Break"
        isActive={isBreakActive}
        setIsActive={setIsBreakActive}
        seconds={breakSeconds}
        setSeconds={setBreakSeconds}
        length={breakLength}
        setIsOtherTimerActive={setIsSessionActive}
        setSessionNumber={setSessionNumber}
      />

      <Stopwatch
        type="Session"
        isActive={isSessionActive}
        setIsActive={setIsSessionActive}
        seconds={sessionSeconds}
        setSeconds={setSessionSeconds}
        length={sessionLength}
        setIsOtherTimerActive={setIsBreakActive}
        setSessionNumber={setSessionNumber}
      />

      <button onClick={reset} className="reset">Reset</button>
    </div>
  );
};

export default TimerBar;
