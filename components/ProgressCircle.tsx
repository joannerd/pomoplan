import { useEffect, useState } from 'react';
import { useTimer } from '../context/TimerContext';

const ProgressCircle = (): React.ReactElement => {
  const { breakTimer, sessionTimer } = useTimer();
  const [strokeDashoffset, setStrokeDashoffset] = useState<number>(100);

  useEffect(() => {
    const maxSeconds: number = breakTimer.isActive
      ? breakTimer.length * 60
      : sessionTimer.length * 60;
    const seconds: number = breakTimer.isActive
      ? breakTimer.seconds
      : sessionTimer.seconds;
    let svgValue = ((seconds * 100) / maxSeconds) * 3.14;
    if (svgValue === NaN) svgValue = 0;
    setStrokeDashoffset(svgValue);
  }, [breakTimer.isActive, sessionTimer.seconds, breakTimer.seconds]);

  return (
    <svg className="progress-circle-svg" viewBox="0 0 100 100" data-value="100">
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#ccc"
        strokeWidth="10"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#09c"
        strokeWidth="10"
        fill="none"
        style={{ strokeDasharray: 314, strokeDashoffset }}
      />
    </svg>
  );
};

export default ProgressCircle;
