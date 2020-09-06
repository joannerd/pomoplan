import React, { useEffect, useState, useCallback } from 'react';
import { useTask, ITask, TaskProperty } from '../../context/TaskContext';
import Task from './Task';

const TodoList = (): React.ReactElement => {
  const { tasks, updateTask } = useTask();
  const [cards, setCards] = useState<ITask[]>([]);

  useEffect(() => {
    const orderedTasks: ITask[] = Object.values(tasks).sort((a, b) => a.order - b.order);
    const unfinished: ITask[] = orderedTasks.filter((task) => !task.isDone && !task.isArchived);
    const archived: ITask[] = orderedTasks.filter(task => task.isArchived);
    const finished: ITask[] = orderedTasks.filter(task => task.isDone && !task.isArchived);

    setCards(unfinished.concat(archived, finished));
  }, [tasks]);

  const moveCard = useCallback(
    (dragIndex, hoverIndex, id) => {
      const dragCard = cards[dragIndex]
      updateTask(id, TaskProperty.order, dragIndex);
      updateTask(dragCard.id, TaskProperty.order, hoverIndex);
    },
    [cards],
  );

  return (
    <ul id="task-list">
      {(cards).map((task: ITask, i: number) => (
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
