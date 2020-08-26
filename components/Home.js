import { useTimer } from '../lib/context';
import { BREAK_END_NOTES, SESSION_END_NOTES } from '../lib/sound';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProgressCircle from './ProgressCircle';
import StopwatchButton from './StopwatchButton';

const Home = () => {
  const { breakTimer, sessionTimer } = useTimer();

  const stopwatchButton = breakTimer.isActive
    ? <StopwatchButton
        seconds={breakTimer.seconds}
        notes={BREAK_END_NOTES} />
    : <StopwatchButton
        seconds={sessionTimer.seconds}
        notes={SESSION_END_NOTES} />;
  
  return (
    <main>
      <article className="flex-column-centered">
        <h1>Pomo</h1>

        <div className="progress-circle">
          <ProgressCircle />
          {stopwatchButton}
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
