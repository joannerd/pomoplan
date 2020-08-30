import { useTimer } from '../context/TimerContext';
import { INotes, BREAK_END_NOTES, SESSION_END_NOTES } from '../lib/sound';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProgressCircle from './ProgressCircle';
import ProgressCircleButton from './ProgressCircleButton';

const Home = (): React.ReactElement => {
  const { breakTimer, sessionTimer } = useTimer();
  const seconds: number = breakTimer.isActive ? breakTimer.seconds : sessionTimer.seconds;
  const notes: INotes = breakTimer.isActive ? BREAK_END_NOTES : SESSION_END_NOTES;
  
  return (
    <main>
      <article className="flex-column-centered">
        <h1>Pomo</h1>

        <div className="progress-circle">
          <ProgressCircle />
          <ProgressCircleButton
            seconds={seconds}
            notes={notes}
          />
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
