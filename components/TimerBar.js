import { useState, useEffect, useContext } from 'react';
import { TimerContext, ErrorContext } from '../lib/context';
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
  const {
    types,
    setNewLengthError,
    setNewInputError,
    clearErrors,
  } = useContext(ErrorContext);
  const { SESSION, BREAK, MIN, MAX } = types;
  const [sessionNumber, setSessionNumber] = useState(1);
  const [sessionInput, setSessionInput] = useState(sessionLength.toString());
  const [breakInput, setBreakInput] = useState('15');
  const clearSessionInput = () => setSessionInput('');
  const clearBreakInput = () => setBreakInput('');

  const updateSession = (e) => {
    const input = e.target.value;
    clearErrors();

    if (input.length < 3) {
      setSessionInput(input);
      validateLength(SESSION, input);
    } else {
      setNewInputError(SESSION);
    }
  };

  const updateBreak = (e) => {
    const input = e.target.value;
    clearErrors();

    if (input.length < 3) {
      setBreakInput(input);
      validateLength(BREAK, input);
    } else {
      setNewInputError(BREAK);
    }
  };

  const validateLength = (type, input) => {
    let length = parseInt(input, 10);
    let minLength = 15;
    if (type === SESSION) minLength = 20;

    const isValid = length <= 30 && length >= minLength;
    if (isValid) {
      if (type === SESSION) {
        setSessionLength(length)
      }
    }

    if (length > 30) {
      setNewLengthError(type, MAX, 30);
    } else if (length < minLength) {
      setNewLengthError(type, MIN, minLength);
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
      setBreakLength(parseInt(breakInput, 10));
      setSessionNumber(1);
    };
  }, [sessionNumber])

  return (
    <div id="clock">
      <ValidationErrors />

      <div>
        <h2>Session</h2>
        <input
          type="number"
          value={sessionInput}
          onClick={clearSessionInput}
          onChange={updateSession}
          min="20"
          max="30"
          required
        />
      </div>

      <div>
        <h2>4th Break</h2>
        <input
          type="number"
          value={breakInput}
          onClick={clearBreakInput}
          onChange={updateBreak}
          min="15"
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
