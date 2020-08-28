import React, { useEffect, useState, useCallback } from 'react';
import { useTask } from '../lib/context';
import Task from './Task';

const TodoList = () => {
  const { tasks, updateTask } = useTask();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const orderedTasks = Object.values(tasks).sort((a, b) => a.order - b.order);
    const unfinished = orderedTasks.filter((task) => !task.isDone && !task.isArchived);
    const archived = orderedTasks.filter(task => task.isArchived);
    const finished = orderedTasks.filter(task => task.isDone && !task.isArchived);

    setCards(unfinished.concat(archived, finished));
  }, [tasks]);

  const moveCard = useCallback(
    (dragIndex, hoverIndex, id) => {
      const dragCard = cards[dragIndex]
      updateTask(id, 'order', dragIndex);
      updateTask(dragCard.id, 'order', hoverIndex);
    },
    [cards],
  );

  return (
    <ul id="task-list">
      {(cards).map((task, i) => (
        <Task
          task={task}
          key={task.id}
          index={i}
          moveCard={moveCard}
        />
      ))}
    </ul>
  );
};

export default TodoList;
