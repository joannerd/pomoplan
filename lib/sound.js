
export const SESSION_END_NOTES = {
  firstNote: 130.81,
  lastNote: 196.00,
};

export const BREAK_END_NOTES = {
  firstNote: 196.00,
  lastNote: 130.81,
};

let audioCtx = null;

const createOscillatorAndGain = (note, delay) => {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.value = note;
  oscillator.start(delay);

  gainNode.gain.value = 0.1;
};

export const createSound = (notes) => {
  const { firstNote, lastNote } = notes;
  const middleNote = 164.81;
  if (audioCtx) stopSound();

  AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();

  createOscillatorAndGain(firstNote, 0);
  createOscillatorAndGain(middleNote, 0.5);
  createOscillatorAndGain(lastNote, 1);
};

export const stopSound = () => {
  if (audioCtx.state === 'running') {
    audioCtx.close();
  }
};
