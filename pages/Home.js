import { useContext } from 'react';
import { TimerContext } from './context';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProgressCircle from './ProgressCircle';
import StopwatchButton from './StopwatchButton';
import { BREAK_END_NOTES, SESSION_END_NOTES } from './sound';

const Home = () => {
  const {
    breakSeconds,
    sessionSeconds,
    isBreakActive,
    setIsBreakActive,
    setIsSessionActive
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
        <DndProvider backend={HTML5Backend}>
          <TaskList />
        </DndProvider>
      </article>
    </main>
  );
};

export default Home;
