import { useContext } from 'react';
import { TimerContext } from '../lib/context';
import { BREAK_END_NOTES, SESSION_END_NOTES } from '../lib/sound';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProgressCircle from './ProgressCircle';
import StopwatchButton from './StopwatchButton';

const Home = () => {
  const {
    breakSeconds,
    sessionSeconds,
    isBreakActive,
  } = useContext(TimerContext);
  
  const stopwatchButton = isBreakActive
    ? <StopwatchButton
        seconds={breakSeconds}
        notes={BREAK_END_NOTES} />
    : <StopwatchButton
        seconds={sessionSeconds}
        notes={SESSION_END_NOTES} />;
  
  return (
    <main>
      <article id="pomo">
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
