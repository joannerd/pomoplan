
export const TASK: string = 'task';
export const TASKS: string = 'tasks';
export const BREAK_TIMER: string = 'break-timer';
export const SESSION_TIMER: string = 'session-timer';
export const ACTIVE_TIMER: string = 'active-timer';

export enum Checkbox {
  checked = '⨂',
  unchecked = '◯',
};

export const formatTime = (seconds: number): string => {
  const min = Math.floor(seconds / 60);
  let sec: string | number  = seconds % 60;
  if (sec < 10) sec = `0${sec}`;
  return `${min}:${sec}`;
};
