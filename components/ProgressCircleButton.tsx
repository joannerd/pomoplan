import { useEffect, useState } from 'react';
import { formatTime } from '../lib/util';
import { INotes, booper } from '../lib/sound';

interface IProgressCircleButtonProps {
  seconds: number;
  notes: INotes;
};

const ProgressCircleButton = ({
  seconds,
  notes,
}: IProgressCircleButtonProps): React.ReactElement => {
  const [isBeeping, setIsBeeping] = useState<boolean>(false);

  const handleStopSoundClick = (): void => {
    booper.stopSound();
    setIsBeeping(false);
  };

  useEffect(() => {
    if (seconds === 0) {
      booper.createSound(notes);
      setIsBeeping(true);
    }
  }, [seconds]);

  const stopSoundButton = <button onClick={handleStopSoundClick}>Stop</button>;

  return (
    <span className="progress-circle-label">
      {isBeeping ? stopSoundButton : formatTime(seconds)}
    </span>
  );
};

export default ProgressCircleButton;
