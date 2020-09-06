import { useState, useEffect } from 'react';
import { useTimer } from '../context/TimerContext';
import { useError, ErrorType } from '../context/ErrorContext';
import Stopwatch from './Stopwatch';
import ValidationErrors from './ValidationErrors';
import { removeStoredTimers } from '../lib/storage';

const TimerBar = (): React.ReactElement => {
  const {
    breakTimer,
    sessionTimer,
  } = useTimer();

  const {
    setNewLengthError,
    setNewInputError,
    clearErrors,
  } = useError();

  const { SESSION, BREAK, MIN, MAX } = ErrorType;
  const [sessionNumber, setSessionNumber] = useState<number>(1);
  const [sessionInput, setSessionInput] = useState<string>(sessionTimer.length.toString());
  const [breakInput, setBreakInput] = useState<string>('15');
  const updateBreak = (e: React.ChangeEvent<{ value: unknown }>): void => updateInput(BREAK, e);
  const updateSession = (e: React.ChangeEvent<{ value: unknown }>): void => updateInput(SESSION, e);

  const updateInput = (type: ErrorType, e: React.ChangeEvent<{ value: unknown }>) => {
    const input: string = e.target.value as string;
    clearErrors();

    if (input.length < 3) {
      (type === SESSION) ? setSessionInput(input) : setBreakInput(input);
      validateLength(type, input);
    } else {
      setNewInputError();
    }
  };

  const validateLength = (type: ErrorType, input: string) => {
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
      breakTimer.setSeconds(breakTimer.length * 60);
    }

  }, [sessionNumber])

  return (
    <div id="clock">
      <span className="flex-row-centered">
        <div className="flex-row-centered">
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

        <div className="flex-row-centered">
          <Stopwatch
            type="Break"
            stopwatchTimer={breakTimer}
            setIsOtherTimerActive={sessionTimer.setIsActive}
            isOtherTimerActive={sessionTimer.isActive}
            setSessionNumber={setSessionNumber}
          />

          <Stopwatch
            type="Session"
            stopwatchTimer={sessionTimer}
            setIsOtherTimerActive={breakTimer.setIsActive}
            isOtherTimerActive={breakTimer.isActive}
            setSessionNumber={setSessionNumber}
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
