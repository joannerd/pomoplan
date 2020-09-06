import CreationForm from '../CreationForm';
import GoalTracker from './GoalTracker';
import { useGoal } from '../../context/GoalContext';

const GoalManager = (): React.ReactElement => {
  const { createGoal } = useGoal();
  return (
    <>
      <article>
        <CreationForm createItem={createGoal} placeholderText="Make a goal" />
      </article>
      <article>
        <h1>Daily Goal Tracker</h1>
        <GoalTracker />
      </article>
    </>
  );
};

export default GoalManager;
