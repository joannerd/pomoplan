import { useEffect, Dispatch, SetStateAction } from 'react';
import { formatTime } from '../../lib/util';
import { useTimer, ITimer } from '../../context/TimerContext';
import StopwatchButton from './StopwatchButton';

interface IStopwatchProps {
  type: string;
  stopwatchTimer: ITimer;
  isOtherTimerActive: boolean;
  setIsOtherTimerActive: Dispatch<SetStateAction<boolean>>;
  setSessionNumber: Dispatch<SetStateAction<number>>;
}

const Stopwatch = ({
  type,
  stopwatchTimer,
  setIsOtherTimerActive,
  setSessionNumber,
  isOtherTimerActive,
}: IStopwatchProps): React.ReactElement => {
  const { updateStoredTimers } = useTimer();
  const { isActive, setIsActive, seconds, setSeconds, length } = stopwatchTimer;

  let timer: NodeJS.Timeout = setInterval(() => {}, 1000);
  const toggleTimer = () => setIsActive(!isActive);
  useEffect(() => setSeconds(length * 60), [length]);

  useEffect(() => {
    if (isActive) {
      setIsOtherTimerActive(false);
      clearInterval(timer);
      timer = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        updateStoredTimers();
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(timer);
      setIsActive(false);
      setSeconds(length * 60);
      setSessionNumber((sessionNumber) => sessionNumber + 1);
    }
  }, [seconds]);

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
