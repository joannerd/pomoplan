import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { TaskContext, TimerContext, ErrorContext } from '../lib/context';
import { TASKS, BREAK_TIMER, SESSION_TIMER } from '../lib/util';
import { types, lengthError, inputError } from '../lib/errors';
import Head from 'next/head'
import Home from '../components/Home';
import TimerBar from '../components/TimerBar';
import TaskOrderList from '../lib/TaskOrderList';

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
  const [taskOrder, setTaskOrder] = useState(null);
  const [numTasks, setNumTasks] = useState(0);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakSeconds, setBreakSeconds] = useState(breakLength * 60);
  const [sessionSeconds, setSessionSeconds] = useState(sessionLength * 60);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(TASKS));
    const storedBreakSeconds = JSON.parse(localStorage.getItem(BREAK_TIMER));
    const storedSessionSeconds = JSON.parse(localStorage.getItem(SESSION_TIMER));
    if (storedTasks) {
      setTasks(storedTasks);

      const orderedTaskIds = {};
      Object.values(storedTasks)
        .sort((a, b) => a.order - b.order)
        .forEach(({ id, order }) => orderedTaskIds[order] = id);
      const taskOrderList = new TaskOrderList(Object.values(orderedTaskIds));
      setTaskOrder(taskOrderList);
    }
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
    taskOrder,
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

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;

    const startId = source.index;
    const endId = destination.index;
    const newOrder = taskOrder.updateTaskOrder(startId, endId);
    console.log(newOrder.toObject())

    setTaskOrder(newOrder);
  };

  // const onDragEnd = (result) => {
  //   const { destination, source } = result;
  //   if (!destination || destination.index === source.index) return;
  //   const startIdx = source.index;
  //   const endIdx = destination.index;

  //   if (startIdx < endIdx) {
  //     let currentStartIdx = startIdx;
  //     let currentEndIdx = startIdx + 1;
  //     while (currentStartIdx < endIdx) {
  //       const taskToMove = Object.values(tasks).filter(task => task.order === currentStartIdx)[0];
  //       const taskToShift = Object.values(tasks).filter(task => task.order === currentEndIdx)[0];
  //       updateTask(taskToMove.id, 'order', currentEndIdx);
  //       updateTask(taskToShift.id, 'order', currentStartIdx);
  //       currentStartIdx += 1;
  //       currentEndIdx += 1;
  //     }
  //   } else {
  //     let currentStartIdx = endIdx;
  //     let currentEndIdx = endIdx + 1;
  //     while (endIdx < currentEndIdx) {
  //       const taskToMove = Object.values(tasks).filter((task) => task.order === currentStartIdx)[0];
  //       const taskToShift = Object.values(tasks).filter((task) => task.order === currentEndIdx)[0];
  //       updateTask(taskToMove.id, 'order', currentEndIdx);
  //       updateTask(taskToShift.id, 'order', currentStartIdx);
  //       currentStartIdx -= 1;
  //       currentEndIdx -= 1;
  //     }
  //   }
  // };

  // const onDragEnd = (result) => {
  //   const { destination, source, draggableId } = result;
  //   if (!destination || destination.index === source.index) return;
  //   const startIdx = source.index;
  //   const endIdx = destination.index;

  //   const orderedTaskIds = [...taskOrder];
  //   console.log(orderedTaskIds);


  //   orderedTaskIds.splice(startIdx, 1);
  //   orderedTaskIds.splice(endIdx, 0, parseInt(draggableId, 10));
  //   // const updatedOrder = [...orderedTaskIds, ...newOrder]

  //   console.log(orderedTaskIds)
  //   // const taskToMove = { ...tasks[startId] };
  //   // const taskToShift = { ...tasks[endId] };




  //   // if (taskToMove.order < taskToShift.order) {

  //   //   taskToMove.order = taskToMove.order + 1;
  //   // } else {
  //   //   taskToMove.order = taskToMove.order - 1;
  //   // }

  //   // while (currentStartIdx < endIdx) {
  //   //   updateTask(taskToMove.id, 'order', currentEndIdx);
  //   //   updateTask(taskToShift.id, 'order', currentStartIdx);
  //   //   currentStartIdx += 1;
  //   //   currentEndIdx += 1;
  //   // }
  // };

  // const addOrder = (startOrder, endOrder) => {
  //   const taskOrder = order
  //     .filter((ord) => ord.order > startOrder && ord.order < endOrder)
  //     .map(({ id, order }) => ({ [order + 1]: id }));
  //   return taskOrder;
  // };

  // const removeOrder = (startOrder, endOrder) => {
  //   const taskOrder = order
  //     .filter((ord) => ord.order < startOrder && ord.order > endOrder)
  //     .map(({ id, order }) => ({ [order - 1]: id }));
  //   return taskOrder;
  // };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Pomoplan
        timerState={timerState}
        taskState={taskState}
        errorState={errorState}
      />
    </DragDropContext>
  );
};

export default Root;
