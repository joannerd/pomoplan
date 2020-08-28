
export const SESSION_END_NOTES = {
  firstNote: 130.81,
  lastNote: 196.00,
};

export const BREAK_END_NOTES = {
  firstNote: 196.00,
  lastNote: 130.81,
};

class Booper {
  constructor() {
    this.audioCtx = null;
  }

  #createOscillatorAndGain = (note, delay) => {
    const oscillator = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = note;
    oscillator.start(delay);

    gainNode.gain.value = 0.1;
  };

  createSound = (notes) => {
    const { firstNote, lastNote } = notes;
    const middleNote = 164.81;
    if (this.audioCtx) this.stopSound();

    AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    this.#createOscillatorAndGain(firstNote, 0);
    this.#createOscillatorAndGain(middleNote, 0.5);
    this.#createOscillatorAndGain(lastNote, 1);
  };

  stopSound = () => {
    if (this.audioCtx.state === 'running') {
      this.audioCtx.close();
    }
  };
}

export const booper = new Booper();

