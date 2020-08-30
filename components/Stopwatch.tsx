import { useEffect, Dispatch, SetStateAction } from 'react';
import { formatTime } from '../lib/util';
import { useTimer, ITimer } from '../context/TimerContext';
import StopwatchButton from './StopwatchButton';

interface IStopwatchProps {
  type: string;
  stopwatchTimer: ITimer;
  isOtherTimerActive: boolean;
  setIsOtherTimerActive: Dispatch<SetStateAction<boolean>>;
  setSessionNumber: Dispatch<SetStateAction<number>>;
};

const Stopwatch = ({
  type,
  stopwatchTimer,
  setIsOtherTimerActive,
  setSessionNumber,
  isOtherTimerActive,
}: IStopwatchProps): React.ReactElement => {
  const { updateStoredTimers } = useTimer();
  const { isActive, setIsActive, seconds, setSeconds, length } = stopwatchTimer;

  let timer: NodeJS.Timeout | null = null;
  const toggleTimer = () => setIsActive(!isActive);
  useEffect(() => setSeconds(length * 60), [length]);

  useEffect(() => {
    if (seconds === 0 && timer) {
      clearInterval(timer);
      toggleTimer();
      setSeconds(length * 60);
      setSessionNumber((sessionNumber) => sessionNumber + 1);
    }

    if (isActive) {
      setIsOtherTimerActive(false);
      timer = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        updateStoredTimers();
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    }
  }, [isActive, seconds]);

  return (
    <>
      <div>
        <h2>{type}</h2>
        <h3>{formatTime(seconds)}</h3>
      </div>

      <StopwatchButton
        isActive={isActive}
        isOtherTimerActive={isOtherTimerActive}
        toggleTimer={toggleTimer}
      />
    </>
  );
};

export default Stopwatch;
