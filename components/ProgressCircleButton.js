import { useEffect, useState } from 'react';
import { formatTime } from '../lib/util';
import { booper } from '../lib/sound';

const ProgressCircleButton = ({ seconds, notes }) => {
  const [isBeeping, setIsBeeping] = useState(false);

  const handleStopSoundClick = () => {
    booper.stopSound();
    setIsBeeping(false);
  };

  useEffect(() => {
    if (seconds === 0) {
      booper.createSound(notes);
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

export default ProgressCircleButton;
