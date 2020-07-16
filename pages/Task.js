import React, { useRef, useState, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TodoContext } from './context';
import { IS_ARCHIVED, IS_DONE, TASK, CHECKBOX,
} from './util';

const Task = ({ index, task, moveCard }) => {
  const ref = useRef(null);
  const { id, description, isDone, isArchived } = task;
  const { deleteTask, updateTask } = useContext(TodoContext);
  const [taskDescription, setTaskDescription] = useState(description);
  const [checkbox, setCheckbox] = useState(isDone ? CHECKBOX.checked : CHECKBOX.unchecked);
  const updateValue = (e) => setTaskDescription(e.target.value);

  const handleCheckboxClick = () => {
    if (isArchived) {
      updateTask(id, IS_ARCHIVED, false);
    } else {
      if (isDone) {
        updateTask(id, IS_DONE, false);
        setCheckbox(CHECKBOX.unchecked);
      } else {
        updateTask(id, IS_DONE, true);
        setCheckbox(CHECKBOX.checked);
      }
    }
  };

  const handleClick = () => {
    if (isArchived || isDone) {
      deleteTask(id);
    } else {
      updateTask(id, IS_ARCHIVED, true);
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateTask(id, 'description', taskDescription);
  };

  const [_, drop] = useDrop({
    accept: TASK,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

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
