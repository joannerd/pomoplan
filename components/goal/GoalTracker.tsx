import { useState, useEffect } from 'react';
import { useGoal, IGoal } from '../../context/GoalContext';
import GoalList from './GoalList';

const CURRENT = 'Current';
const PREVIOUS = 'Previous';

const GoalTracker = () => {
  const { goals } = useGoal();
  const [unfinishedGoals, setUnfinishedGoals] = useState<IGoal[]>([]);
  const [finishedGoals, setFinishedGoals] = useState<IGoal[]>([]);
  const [activeComponent, setActiveComponent] = useState<string>(CURRENT);

  useEffect(() => {
    const orderedGoals: IGoal[] = Object.values(goals).sort(
      (a, b) => a.startDate - b.startDate
    );
    setUnfinishedGoals(orderedGoals.filter((goal) => !goal.isFinished));
    setFinishedGoals(orderedGoals.filter((goal) => goal.isFinished));
  }, [goals]);

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const clickTarget = (e.target as unknown) as HTMLElement;
    setActiveComponent(clickTarget.innerText);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case CURRENT:
        return <GoalList key="unfinished" goals={unfinishedGoals} />;
      case PREVIOUS:
        return <GoalList key="finished" goals={finishedGoals} />;
      default:
        return <GoalList key="unfinished" goals={unfinishedGoals} />;
    }
  };

  return (
    <>
      <h2 onClick={handleClick}>
        <span className={activeComponent === CURRENT ? 'navlink active' : 'navlink'}>
          {CURRENT}
        </span>
        <span className={activeComponent === PREVIOUS ? 'navlink active' : 'navlink'}>
          {PREVIOUS}
        </span>
      </h2>
      {renderComponent()}
    </>
  );
}

export default GoalTracker;
