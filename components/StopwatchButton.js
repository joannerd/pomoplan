import { useEffect, useState } from 'react';
import { formatTime } from '../lib/util';
import { createSound, stopSound } from '../lib/sound';

const StopwatchButton = ({ seconds, notes }) => {
  const [isBeeping, setIsBeeping] = useState(false);

  const handleStopSoundClick = () => {
    stopSound();
    setIsBeeping(false);
  };

  useEffect(() => {
    if (seconds === 0) {
      createSound(notes);
      setIsBeeping(true);
    };
  }, [seconds]);

  const stopSoundButton = <button onClick={handleStopSoundClick}>Stop</button>;

  return (
    <span className="progress-circle-label">
      {isBeeping ? stopSoundButton : formatTime(seconds)}
    </span>
  );
}

export default StopwatchButton;
