import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useTimer } from '../../context/TimerContext';
import { formatTime } from '../../lib/util';

const ProgressCircle = (): React.ReactElement => {
  const { breakTimer, sessionTimer } = useTimer();
  const [strokeDashoffset, setStrokeDashoffset] = useState<number>(100);
  const [activeSeconds, setActiveSeconds] = useState<string>(formatTime(0));

  useEffect(() => {
    const maxSeconds: number = breakTimer.isActive
      ? breakTimer.length * 60
      : sessionTimer.length * 60;
    const seconds: number = breakTimer.isActive
      ? breakTimer.seconds
      : sessionTimer.seconds;
    let svgValue = (seconds / maxSeconds) * 314;
    if (svgValue === NaN) svgValue = 0;
    setStrokeDashoffset(svgValue);
    setActiveSeconds(formatTime(seconds));
  }, [breakTimer.isActive, sessionTimer.seconds, breakTimer.seconds]);

  return (
    <>
      <Head>
        <title>Pomoplan - {activeSeconds}</title>
      </Head>
      <svg
        className="progress-circle-svg"
        viewBox="0 0 100 100"
        data-value="100"
      >
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
    </>
  );
};

export default ProgressCircle;
