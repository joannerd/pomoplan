import { useState, useEffect, useContext, useRef } from 'react';
import { TimerContext } from '../lib/context';
import Stopwatch from './Stopwatch';
import ValidationErrors from './ValidationErrors';

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
  const ref = useRef();
  const [sessionNumber, setSessionNumber] = useState(1);
  const [sessionInput, setSessionInput] = useState(sessionLength.toString());
  const [errors, setErrors] = useState({});

  const clearSessionInput = () => setSessionInput('');

  const updateSession = (e) => {
    const inputLength = e.target.value;
    setErrors([]);

    if (inputLength.length < 3) {
      setSessionInput(inputLength);
      let length = parseInt(inputLength, 10);
      const id = new Date().getTime();
      const isValid = length <= 30 && length >= 20;
      if (length > 30) {
        length = 30;
        const maxLengthError = {
          [id] : {
            id,
            message: 'Maximum session length is 30 minutes.',
          },
        };

        setErrors((errors) => ({ ...errors, ...maxLengthError }));
      } else if (length < 20) {
        length = 20;
        const minLengthError = {
          [id]: {
            id,
            message: 'Minimum session length is 20 minutes.',
          },
        };

        setErrors((errors) => ({ ...errors, ...minLengthError }));
      } else if (isValid) {
        setSessionLength(length);
      }
    }
  };

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

  useEffect(() => {
    if (errors.length) setErrors([]);
  }, []);

  const clearError = (id) => {
    const updatedErrors = { ...errors };
    delete updatedErrors[id];
    setErrors(updatedErrors);
    clearSessionInput();
    ref.current.focus();
  };

  return (
    <div id="clock">
      <div className="session-length">
        <h2>Session</h2>
        <input
          ref={ref}
          type="number"
          value={sessionInput}
          onClick={clearSessionInput}
          onChange={updateSession}
          min="20"
          max="30"
          required
        />
        <ValidationErrors errors={Object.values(errors)} clearError={clearError} />
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
        sessionNumber={sessionNumber}
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
        sessionNumber={sessionNumber}
      />

      <button onClick={reset} className="reset">
        Reset
      </button>
    </div>
  );
};

export default TimerBar;
