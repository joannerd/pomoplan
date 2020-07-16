import { useState, useEffect } from 'react';
import { TaskContext, TimerContext } from './context';
import { TASKS, BREAK_TIMER, SESSION_TIMER } from './util';
import Head from 'next/head'
import Home from './Home';
import TimerBar from './TimerBar';

const Pomoplan = ({ timerState, taskState }) => (
  <div className="flex-column-centered container">
    <Head>
      <title>Pomoplan</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
        rel="stylesheet" />
    </Head>
    <TimerContext.Provider value={timerState}>
      <header>
        <h1>Pomoplan</h1>
        <TimerBar />
      </header>

      <TaskContext.Provider value={taskState}>
        <Home />
      </TaskContext.Provider>
    </TimerContext.Provider>

    <footer className="flex-row-centered">
      <a
        href="https://github.com/junnac"
        target="_blank"
        rel="noopener noreferrer"
      >
        © Joanna Chen
      </a>
    </footer>
  </div>
);

const Root = () => {
  const [tasks, setTasks] = useState({});
  const [numTasks, setNumTasks] = useState(0);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakSeconds, setBreakSeconds] = useState(2);
  const [sessionSeconds, setSessionSeconds] = useState(sessionLength * 60);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(TASKS));
    const storedBreakSeconds = JSON.parse(localStorage.getItem(BREAK_TIMER));
    const storedSessionSeconds = JSON.parse(localStorage.getItem(SESSION_TIMER));
    if (storedTasks) setTasks(storedTasks);
    if (storedBreakSeconds) setBreakSeconds(storedBreakSeconds);
    if (storedSessionSeconds) setSessionSeconds(storedSessionSeconds);

    return () => {
      localStorage.setItem(BREAK_TIMER, breakSeconds);
      localStorage.setItem(SESSION_TIMER, sessionSeconds);
    }
  }, [])

  useEffect(() => {
    setNumTasks(Object.values(tasks).length);
  }, [tasks])

  const createTask = (description) => {
    const newTaskId = new Date().getTime();
    const updatedTasks = { ...tasks };
    updatedTasks[newTaskId] = {
      id: newTaskId,
      description,
      isDone: false,
      isArchived: false,
      order: numTasks + 1,
    };

    updateStoredTasks(updatedTasks);
  };

  const updateStoredTasks = (updatedTasks) => {
    const jsonTasks = JSON.stringify(updatedTasks);
    localStorage.setItem(TASKS, jsonTasks);
    setTasks(updatedTasks);
  };

  const updateTask = (id, key, value) => {
    const updatedTasks = { ...tasks };
    updatedTasks[id][key] = value;
    updateStoredTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const tasksWithDeletion = { ...tasks };
    delete tasksWithDeletion[id];
    updateStoredTasks(tasksWithDeletion);
  };

  const removeStoredTimers = () => {
    localStorage.removeItem(BREAK_TIMER);
    localStorage.removeItem(SESSION_TIMER);
  };

  const updateStoredTimers = () => {
    localStorage.setItem(BREAK_TIMER, breakSeconds);
    localStorage.setItem(SESSION_TIMER, sessionSeconds);
  };

  const taskState = {
    tasks,
    createTask,
    deleteTask,
    updateTask,
  };

  const timerState = {
    breakLength,
    setBreakLength,
    sessionLength,
    setSessionLength,
    breakSeconds,
    setBreakSeconds,
    sessionSeconds,
    setSessionSeconds,
    updateStoredTimers,
    removeStoredTimers,
    isBreakActive,
    setIsBreakActive,
    isSessionActive,
    setIsSessionActive,
  };

  return <Pomoplan timerState={timerState} taskState={taskState} />;
};

export default Root;
