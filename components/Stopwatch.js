import { useEffect } from 'react';
import { formatTime } from '../lib/util';
import { useTimer } from '../lib/context';

const Stopwatch = ({
  type,
  stopwatchTimer,
  setIsOtherTimerActive,
  setSessionNumber,
  isOtherTimerActive,
}) => {
  const { updateStoredTimers } = useTimer();
  const { isActive, setIsActive, seconds, setSeconds, length } = stopwatchTimer;

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

  const buttonName = isActive ? 'Pause' : 'Start';

  const button = isOtherTimerActive ? (
    <button onClick={toggleTimer} disabled>
      {buttonName}
    </button>
  ) : (
    <button onClick={toggleTimer} className={buttonName.toLowerCase()}>
      {buttonName}
    </button>
  );

  return (
    <>
      <div>
        <h2>{type}</h2>
        <h3>{formatTime(seconds)}</h3>
      </div>
      {button}
    </>
  );
};

export default Stopwatch;
