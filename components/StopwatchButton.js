const StopwatchButton = ({ isOtherTimerActive, toggleTimer, isActive }) => {
  const buttonName = isActive ? 'Pause' : 'Start';

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
