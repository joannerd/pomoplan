import React, { useRef, useState, FormEvent } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ITask, useTask, TaskProperty } from '../context/TaskContext';
import { TASK, Checkbox } from '../lib/util';

interface ITaskProps {
  index: number;
  task: ITask;
  moveCard: (dragIndex: number, hoverIndex: number, id: number) => void;
};

interface IDragDropItem {
  type: string;
  id: number;
  index: number;
};

const Task = ({ index, task, moveCard }: ITaskProps): React.ReactElement => {
  const ref = useRef<HTMLLIElement | null>(null);
  const { id, description, isDone, isArchived } = task;
  const { deleteTask, updateTask } = useTask();
  const [taskDescription, setTaskDescription] = useState<string>(description);
  const [checkbox, setCheckbox] = useState<Checkbox>(
    isDone ? Checkbox.checked : Checkbox.unchecked
  );

  const updateValue = (e: React.ChangeEvent<{ value: unknown }>): void => {
    setTaskDescription(e.target.value as string);
  };

  const handleCheckboxClick = (): void => {
    if (isArchived) {
      updateTask(id, TaskProperty.isArchived, false);
    } else {
      if (isDone) {
        updateTask(id, TaskProperty.isDone, false);
        setCheckbox(Checkbox.unchecked);
      } else {
        updateTask(id, TaskProperty.isDone, true);
        setCheckbox(Checkbox.checked);
      }
    }
  };

  const handleClick = (): void => {
    if (isArchived || isDone) {
      deleteTask(id);
    } else {
      updateTask(id, TaskProperty.isArchived, true);
    }
  };

  const handleUpdateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTask(id, TaskProperty.description, taskDescription);
  };

  const [_, drop] = useDrop({
    accept: TASK,
    hover(item: IDragDropItem) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      moveCard(dragIndex, hoverIndex, id);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: TASK, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDone || isDragging || isArchived ? 0.3 : 1;
  drag(drop(ref));

  return (
    <li ref={ref} className="task flex-row-centered" style={{ opacity }}>
      <span onClick={handleCheckboxClick}>{checkbox}</span>
      <form onSubmit={handleUpdateSubmit}>
        <input
          type="text"
          value={taskDescription}
          onChange={updateValue}
          required
        />
      </form>
      <span onClick={handleClick}>X</span>
    </li>
  );
};

export default Task;
