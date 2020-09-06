enum ButtonType {
  pause = 'Pause',
  start = 'Start',
};

interface IStopwatchButtonProps {
  isOtherTimerActive: boolean;
  toggleTimer: () => void;
  isActive: boolean;
};

const StopwatchButton = ({
  isOtherTimerActive,
  toggleTimer,
  isActive,
}: IStopwatchButtonProps): React.ReactElement => {
  const buttonName: ButtonType = isActive ? ButtonType.pause : ButtonType.start;

  if (isOtherTimerActive) {
    return (
      <button onClick={toggleTimer} disabled>
        {buttonName}
      </button>
    );
  }

  return (
    <button onClick={toggleTimer} className={buttonName.toLowerCase()}>
      {buttonName}
    </button>
  );
};

export default StopwatchButton;
