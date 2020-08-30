import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import TaskProvider from '../components/providers/TaskProvider';
import TimerProvider from '../components/providers/TimerProvider';
import ErrorProvider from '../components/providers/ErrorProvider';

import Head from 'next/head'
import Home from '../components/Home';
import TimerBar from '../components/TimerBar';

// type CourseCardProps = {
//   slug: string;
//   title: string;
//   description: string;
//   subtitle?: string;
//   percentComplete: number;
//   isFavorite: boolean;
// };

// export type Practice = {
//   identifier: string;
//   practiceType: PracticeType;
//   title: string;
//   subtitle: string;
//   markdown?: string;
//   vimeoId?: string;
//   githubUrl?: string;
//   cloneUrl?: string;
//   timeToComplete?: number;
// };

const Root = () => (
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
          <Home />
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
