import Head from 'next/head';
import GoalManager from '../../components/GoalManager';

const GoalTracker = (): React.ReactElement => (
  <div className="flex-column-centered container">
    <Head>
      <title>Pomoplan - Goals</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
        rel="stylesheet"
      />
    </Head>

    <header>
      <h1>Pomogoals</h1>
    </header>
    <GoalManager />

    <footer className="flex-row-centered">
      <a href="https://junnac.com/" target="_blank" rel="noopener noreferrer">
        © Joanna Chen
      </a>
    </footer>
  </div>
);

export default GoalTracker;
