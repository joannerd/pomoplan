import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useTimer } from '../../context/TimerContext';
import { formatTime, BREAK_TIMER, SESSION_TIMER, ACTIVE_TIMER } from '../../lib/util';
import { setLocalStorage } from '../../lib/storage';
import ProgressCircleButton from '../timer/ProgressCircleButton';
import { INotes, BREAK_END_NOTES, SESSION_END_NOTES } from '../../lib/sound';

const ProgressCircle = (): React.ReactElement => {
  const { breakTimer, sessionTimer } = useTimer();
  const [strokeDashoffset, setStrokeDashoffset] = useState<number>(314);
  const [activeSeconds, setActiveSeconds] = useState<number>(sessionTimer.seconds);
  const [activeNotes, setActiveNotes] = useState<INotes>(SESSION_END_NOTES);

  useEffect(() => {
    if (breakTimer.isActive) updateTimer(BREAK_TIMER, breakTimer);
    if (sessionTimer.isActive) updateTimer(SESSION_TIMER, sessionTimer);

    activeNotes !== BREAK_END_NOTES
      ? setActiveNotes(BREAK_END_NOTES)
      : setActiveNotes(SESSION_END_NOTES);
  }, [sessionTimer.isActive, sessionTimer.seconds, breakTimer.isActive, breakTimer.seconds]);

  const updateTimer = (timerName, timer) => {
    let svgValue = (timer.seconds / (timer.length * 60)) * 314;
    if (svgValue === NaN) svgValue = 314;
    setActiveSeconds(timer.seconds);
    setLocalStorage(timerName, timer.seconds);
    setLocalStorage(ACTIVE_TIMER, timerName);
    setStrokeDashoffset(svgValue);
  };

  return (
    <>
      <Head>
        <title>Pomoplan - {formatTime(activeSeconds)}</title>
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
          stroke="#f88b8b"
          strokeWidth="10"
          fill="none"
          style={{ strokeDasharray: 314, strokeDashoffset }}
        />
      </svg>
      <ProgressCircleButton seconds={activeSeconds} notes={activeNotes} />
    </>
  );
};

export default ProgressCircle;
