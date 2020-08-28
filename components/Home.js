import { useTimer } from '../lib/context';
import { BREAK_END_NOTES, SESSION_END_NOTES } from '../lib/sound';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProgressCircle from './ProgressCircle';
import ProgressCircleButton from './ProgressCircleButton';

const Home = () => {
  const { breakTimer, sessionTimer } = useTimer();

  const progressCircleButton = breakTimer.isActive
    ? <ProgressCircleButton
        seconds={breakTimer.seconds}
        notes={BREAK_END_NOTES} />
    : <ProgressCircleButton
        seconds={sessionTimer.seconds}
        notes={SESSION_END_NOTES} />;
  
  return (
    <main>
      <article className="flex-column-centered">
        <h1>Pomo</h1>

        <div className="progress-circle">
          <ProgressCircle />
          {progressCircleButton}
        </div>
      </article>
      <article>
        <p>Welcome to Pomoplan.</p>
        <TaskForm />
        <TaskList />
      </article>
    </main>
  );
};

export default Home;
