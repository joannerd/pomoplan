import { useGoal, IGoal } from '../../context/GoalContext';

interface IGoalCard {
  goal: IGoal
};

const GoalCard = ({ goal }: IGoalCard) => {
  const today: string = new Date().toDateString();
  const { incrementStreak, decrementStreak, deleteGoal, finishGoal } = useGoal();
  const {
    id,
    currentStreak,
    overallStreak,
    isFinished,
    description,
    lastActiveDate,
  } = goal;

  const wasActiveToday = today === lastActiveDate;

  const renderStreakButton = () => {
    if (isFinished) {
      return (
        <button className="goal-button done" disabled>
          Done
        </button>
      );
    } else if (wasActiveToday) {
      return (
        <button className="goal-button done" onClick={() => decrementStreak(id)}>
          Done
        </button>
      );
    } else {
      return (
        <button className="goal-button" onClick={() => incrementStreak(id)}>
          Check
        </button>
      );
    }
  }

  const renderFinishOrDelete = () => isFinished ? (
    <button className="goal-button" onClick={() => deleteGoal(id)}>
      Delete
    </button>
  ) : (
    <button className="goal-button" onClick={() => finishGoal(id)}>
      Finish
    </button>
  );

  return (
    <div className="goal-card">
      <h2>{description}</h2>
      <p>Current streak: {currentStreak}</p>
      <p>Overall streak: {overallStreak}</p>
      {renderStreakButton()}
      {renderFinishOrDelete()}
    </div>
  );
};

export default GoalCard;
