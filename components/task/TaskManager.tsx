import { useTimer } from '../../context/TimerContext';
import { useTask } from '../../context/TaskContext';
import { INotes, BREAK_END_NOTES, SESSION_END_NOTES } from '../../lib/sound';
import CreationForm from '../CreationForm';
import TaskList from './TaskList';
import ProgressCircle from '../timer/ProgressCircle';
import ProgressCircleButton from '../timer/ProgressCircleButton';

const TaskManager = (): React.ReactElement => {
  const { breakTimer, sessionTimer } = useTimer();
  const { createTask } = useTask();

  const seconds: number = breakTimer.isActive
    ? breakTimer.seconds
    : sessionTimer.seconds;
  const notes: INotes = breakTimer.isActive
    ? BREAK_END_NOTES
    : SESSION_END_NOTES;

  return (
    <>
      <article className="flex-column-centered">
        <h1>Timer</h1>
        <div className="progress-circle">
          <ProgressCircle />
          <ProgressCircleButton seconds={seconds} notes={notes} />
        </div>
      </article>
      <article>
        <p>Welcome to Pomoplan.</p>
        <CreationForm
          createItem={createTask}
          placeholderText="Add a task"
        />
        <TaskList />
      </article>
    </>
  );
};

export default TaskManager;
