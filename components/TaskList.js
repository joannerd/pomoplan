import React, { useEffect, useState, useContext } from 'react';
import { TaskContext } from '../lib/context';
import Task from './Task';

const TodoList = ({ innerRef }) => {
  const { tasks } = useContext(TaskContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const orderedTasks = Object.values(tasks).sort((a, b) => a.order - b.order);
    const unfinished = orderedTasks.filter(task => !task.isDone && !task.isArchived);
    const archived = orderedTasks.filter(task => task.isArchived);
    const finished = orderedTasks.filter(task => task.isDone && !task.isArchived);

    setCards(unfinished.concat(archived, finished));
  }, [tasks]);

  return (
    <ul id="task-list" ref={innerRef}>
      {(cards).map((task) => <Task task={task} key={task.id} />)}
    </ul>
  );
};

export default TodoList;
