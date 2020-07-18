import { useEffect, useState, useContext } from 'react';
import { TimerContext } from '../lib/context';

const ProgressCircle = () => {
  const {
    breakSeconds,
    sessionSeconds,
    isBreakActive,
    breakLength,
    sessionLength
  } = useContext(TimerContext);

  const [strokeDashoffset, setStrokeDashoffset] = useState(100);

  useEffect(() => {
    const maxSeconds = isBreakActive ? breakLength * 60 : sessionLength * 60;
    const seconds = isBreakActive ? breakSeconds : sessionSeconds;
    let svgValue = ((seconds * 100) / maxSeconds) * 3.14;
    if (svgValue === NaN) svgValue = 0;
    setStrokeDashoffset(svgValue);
  }, [isBreakActive, sessionSeconds, breakSeconds]);

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
