import React, { useRef, useState, useContext } from 'react';
import { TaskContext } from '../lib/context';
import { IS_ARCHIVED, IS_DONE, CHECKBOX } from '../lib/util';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task }) => {
  const ref = useRef(null);
  const { id, description, isDone, isArchived } = task;
  const { deleteTask, updateTask } = useContext(TaskContext);
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

  return (
    <Draggable draggableId={task.id.toString()} index={task.order}>
      {(provided) => (
          <li
            className="task flex-row-centered"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
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
      )}
    </Draggable>
  );
};

export default Task;
