import { useContext } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TimerContext } from '../lib/context';
import { BREAK_END_NOTES, SESSION_END_NOTES } from '../lib/sound';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProgressCircle from './ProgressCircle';
import StopwatchButton from './StopwatchButton';

const Home = () => {
  const { breakTimer, sessionTimer } = useContext(TimerContext);

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
        <Droppable droppableId="all-tasks">
          {(provided) => (
            <TaskList {...provided.droppableProps} innerRef={provided.innerRef}>
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </article>
    </main>
  );
};

export default Home;
