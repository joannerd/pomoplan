import { useEffect, useState } from 'react';
import { formatTime } from './util';
import { createSound, stopSound } from './sound';

const StopwatchButton = ({ seconds, notes, setIsOtherTimerActive }) => {
  const [isBeeping, setIsBeeping] = useState(false);

  const handleStopSoundClick = () => {
    stopSound();
    setIsBeeping(false);
    setIsOtherTimerActive(true);
  };

  useEffect(() => {
    if (seconds === 0) {
      createSound(notes);
      setIsBeeping(true);
    };
  }, [seconds]);

  const stopSoundButton = <button onClick={handleStopSoundClick}>Stop</button>;

  return (
    <span className="clock-label">
      {isBeeping ? stopSoundButton : formatTime(seconds)}
    </span>
  );
}

export default StopwatchButton;
