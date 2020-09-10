import { useTimer } from '../../context/TimerContext';
import { useTask } from '../../context/TaskContext';
import CreationForm from '../CreationForm';
import TaskList from './TaskList';
import ProgressCircle from '../timer/ProgressCircle';

const TaskManager = (): React.ReactElement => {
  const { createTask } = useTask();

  return (
    <>
      <article className="flex-column-centered">
        <h1>Timer</h1>
        <div className="progress-circle">
          <ProgressCircle />
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
