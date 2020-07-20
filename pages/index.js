import { useState, useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';
import { TaskContext, TimerContext, ErrorContext } from '../lib/context';
import { TASKS, BREAK_TIMER, SESSION_TIMER } from '../lib/util';
import { types, lengthError, inputError } from '../lib/errors';
import Head from 'next/head'
import Home from '../components/Home';
import TimerBar from '../components/TimerBar';

const Pomoplan = ({ timerState, taskState, errorState }) => (
  <div className="flex-column-centered container">
    <Head>
      <title>Pomoplan</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
        rel="stylesheet"
      />
    </Head>
    <TimerContext.Provider value={timerState}>
      <header>
        <h1>Pomoplan</h1>
        <ErrorContext.Provider value={errorState}>
          <TimerBar />
        </ErrorContext.Provider>
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
  const [breakSeconds, setBreakSeconds] = useState(breakLength * 60);
  const [sessionSeconds, setSessionSeconds] = useState(sessionLength * 60);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [isTouchDevice, setIsTouchDevice] = useState(false);

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
    const id = new Date().getTime();
    const updatedTasks = { ...tasks };
    updatedTasks[id] = {
      id,
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

  const setNewLengthError = (type, minOrMax, length) => {
    const newError = lengthError(type, minOrMax, length);
    setErrors((errors) => ({ ...errors, ...newError }));
  };

  const setNewInputError = (type) => {
    const newError = inputError(type);
    setErrors((errors) => ({ ...errors, ...newError }));
  };

  const clearErrors = () => setErrors([]);
  const clearError = (id) => {
    const updatedErrors = { ...errors };
    delete updatedErrors[id];
    setErrors(updatedErrors);
  };

  const taskState = {
    tasks,
    createTask,
    deleteTask,
    updateTask,
  };

  const timerState = {
    breakTimer: {
      length: breakLength,
      setLength: setBreakLength,
      seconds: breakSeconds,
      setSeconds: setBreakSeconds,
      isActive: isBreakActive,
      setIsActive: setIsBreakActive,
    },
    sessionTimer: {
      length: sessionLength,
      setLength: setSessionLength,
      seconds: sessionSeconds,
      setSeconds: setSessionSeconds,
      isActive: isSessionActive,
      setIsActive: setIsSessionActive,
    },
    updateStoredTimers,
    removeStoredTimers,
  };

  const errorState = {
    errors,
    types,
    setNewLengthError,
    setNewInputError,
    clearErrors,
    clearError,
  };

  useEffect(() => {
    console.log(window)
    if ('ontouchstart' in window) {
      setIsTouchDevice(true);
    } else {
      setIsTouchDevice(false);
    }
  }, []);

  const backendForDND = isTouchDevice ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backendForDND}>
      <Pomoplan
        timerState={timerState}
        taskState={taskState}
        errorState={errorState}
      />
    </DndProvider>
  );
};

export default Root;
