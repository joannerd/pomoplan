import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import TaskProvider from '../components/providers/TaskProvider';
import TimerProvider from '../components/providers/TimerProvider';
import ErrorProvider from '../components/providers/ErrorProvider';

import Head from 'next/head'
import TaskManager from '../components/TaskManager';
import TimerBar from '../components/TimerBar';

const Root = (): React.ReactElement => (
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
        <TaskProvider>
          <TaskManager />
        </TaskProvider>
      </TimerProvider>

      <footer className="flex-row-centered">
        <a href="https://junnac.com/" target="_blank" rel="noopener noreferrer">
          © Joanna Chen
        </a>
      </footer>
    </div>
  </DndProvider>
);

export default Root;
