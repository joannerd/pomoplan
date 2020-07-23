
export const IS_ARCHIVED = 'isArchived';
export const IS_DONE = 'isDone';
export const TASK = 'task';
export const TASKS = 'tasks';
export const BREAK_TIMER = 'break-timer';
export const SESSION_TIMER = 'session-timer';
export const ACTIVE_TIMER = 'active-timer';

export const CHECKBOX = {
  checked: '⨂',
  unchecked: '◯',
};

export const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  if (sec < 10) sec = `0${sec}`;
  return `${min}:${sec}`;
};
