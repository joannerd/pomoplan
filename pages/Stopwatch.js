import { useEffect, useContext } from 'react';
import { formatTime } from './util';
import { TimerContext } from './context';

const Stopwatch = ({
  type,
  isActive,
  setIsActive,
  seconds,
  setSeconds,
  length,
  setIsOtherTimerActive,
  setSessionNumber,
}) => {
  const { updateStoredTimers } = useContext(TimerContext);

  let timer = null;
  const toggleTimer = () => setIsActive(!isActive);
  useEffect(() => setSeconds(length * 60), [length]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(timer);
      toggleTimer();
      setSeconds(length * 60);
      setSessionNumber(sessionNumber => sessionNumber + 1);
      setIsOtherTimerActive(true);
    }

    if (isActive) {
      setIsOtherTimerActive(false);
      timer = setInterval(() => {
        setSeconds(seconds => seconds - 1);
        updateStoredTimers();
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, seconds]);

  const buttonName = isActive ? 'pause' : 'start';

  return (
    <>
      <div>
        <h2>{type}</h2>
        <h3>{formatTime(seconds)}</h3>
      </div>
      <button onClick={toggleTimer} className={buttonName}>
        {buttonName.toUpperCase()}
      </button>
    </>
  );
};

export default Stopwatch;
