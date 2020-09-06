import { IGoal } from '../../context/GoalContext';
import GoalCard from './GoalCard';

interface IGoalListProps {
  goals: IGoal[];
}

const GoalList = ({ goals }: IGoalListProps): React.ReactElement => (
  <ul id="task-list">
    {goals.map((goal: IGoal) => (
      <GoalCard key={goal.id} goal={goal} />
    ))}
  </ul>
);

export default GoalList;
