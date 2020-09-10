import { useState, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import TaskProvider from '../components/providers/TaskProvider';
import GoalProvider from '../components/providers/GoalProvider';
import TimerProvider from '../components/providers/TimerProvider';
import ErrorProvider from '../components/providers/ErrorProvider';

import Head from 'next/head';
import TaskManager from '../components/task/TaskManager';
import GoalManager from '../components/goal/GoalManager';
import TimerBar from '../components/timer/TimerBar';

const TASKS = 'Tasks';
const GOALS = 'Goals';

const Root = (): React.ReactElement => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [activeComponent, setActiveComponent] = useState<string>(TASKS);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const clickTarget = (e.target as unknown) as HTMLElement;
    setActiveComponent(clickTarget.innerText);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case TASKS:
        return (
          <TaskProvider>
            <TaskManager />
          </TaskProvider>
        );
      case GOALS:
        return (
          <GoalProvider>
            <GoalManager />
          </GoalProvider>
        );
      default:
        return (
          <TaskProvider>
            <TaskManager />
          </TaskProvider>
        );
    }
  };

  const taskStyle = activeComponent === TASKS ? 'navlink active' : 'navlink';
  const goalStyle = activeComponent === GOALS ? 'navlink active' : 'navlink';

  if (!isLoaded) return null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex-column-centered container">
        <Head>
          <title>Pomoplan</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
            rel="stylesheet"
          />
        </Head>

        <TimerProvider>
          <header>
            <h1>Pomoplan</h1>
            <ErrorProvider>
              <TimerBar />
            </ErrorProvider>
          </header>
          <article>
            <h1 onClick={handleClick}>
              <span className={taskStyle}>
                {TASKS}
              </span>
              <span className={goalStyle}>
                {GOALS}
              </span>
            </h1>
          </article>
          <main>{renderComponent()}</main>
        </TimerProvider>

        <footer className="flex-row-centered">
          <a
            href="https://junnac.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            © Joanna Chen
          </a>
        </footer>
      </div>
    </DndProvider>
  );
};
export default Root;
