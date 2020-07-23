import { useState, useEffect, useContext } from 'react';
import { TimerContext, ErrorContext } from '../lib/context';
import Stopwatch from './Stopwatch';
import ValidationErrors from './ValidationErrors';

const TimerBar = () => {
  const {
    breakTimer,
    sessionTimer,
    removeStoredTimers,
  } = useContext(TimerContext);
  const {
    types,
    setNewLengthError,
    setNewInputError,
    clearErrors,
  } = useContext(ErrorContext);

  const { SESSION, BREAK, MIN, MAX } = types;
  const [sessionNumber, setSessionNumber] = useState(1);
  const [sessionInput, setSessionInput] = useState(sessionTimer.length.toString());
  const [breakInput, setBreakInput] = useState('15');
  const updateBreak = (e) => updateInput(BREAK, e);
  const updateSession = (e) => updateInput(SESSION, e);

  const updateInput = (type, e) => {
    const input = e.target.value;
    clearErrors();

    if (input.length < 3) {
      (type === SESSION) ? setSessionInput(input) : setBreakInput(input);
      validateLength(type, input);
    } else {
      setNewInputError(type);
    }
  };

  const validateLength = (type, input) => {
    let length = parseInt(input, 10);
    let minLength = 15;
    if (type === SESSION) minLength = 20;

    const isValid = length <= 30 && length >= minLength;
    if (isValid) {
      if (type === SESSION) {
        sessionTimer.setLength(length)
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
    breakTimer.setIsActive(false);
    sessionTimer.setIsActive(false);
    breakTimer.setSeconds(breakTimer.length * 60);
    sessionTimer.setSeconds(sessionTimer.length * 60);
  };
  
  useEffect(() => {
    if (sessionNumber === 4) {
      breakTimer.setSeconds(parseInt(breakInput, 10) * 60);
      setSessionNumber(1);
    } else {
      breakTimer.setSeconds(parseInt(breakTimer.length, 10) * 60);
    }

  }, [sessionNumber])

  return (
    <div id="clock">
      <span className="flex-row-centered">
        <div className="flex-row-centered mobile-timer-bar">
          <ValidationErrors />

          <div>
            <h2>Session</h2>
            <input
              type="number"
              value={sessionInput}
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
              onChange={updateBreak}
              min="15"
              max="30"
              required
            />
          </div>
        </div>

        <div className="flex-row-centered mobile-timer-bar">
          <Stopwatch
            type="Break"
            stopwatchTimer={breakTimer}
            setIsOtherTimerActive={sessionTimer.setIsActive}
            isOtherTimerActive={sessionTimer.isActive}
            setSessionNumber={setSessionNumber}
            sessionNumber={sessionNumber}
          />

          <Stopwatch
            type="Session"
            stopwatchTimer={sessionTimer}
            setIsOtherTimerActive={breakTimer.setIsActive}
            isOtherTimerActive={breakTimer.isActive}
            setSessionNumber={setSessionNumber}
            sessionNumber={sessionNumber}
          />

          <button onClick={reset} className="reset">
            Reset
          </button>
        </div>
      </span>
    </div>
  );
};

export default TimerBar;
