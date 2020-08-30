export interface INotes {
  firstNote: number;
  lastNote: number;
}

export const SESSION_END_NOTES: INotes = {
  firstNote: 130.81,
  lastNote: 196.00,
};

export const BREAK_END_NOTES: INotes = {
  firstNote: 196.00,
  lastNote: 130.81,
};

declare global {
  interface Window {
    AudioContext: any;
    webkitAudioContext: any;
  }
}

class Booper {
  audioCtx: AudioContext | null;

  constructor() {
    this.audioCtx = null;
  }

  createOscillatorAndGain = (note: number, delay: number): void => {
    if (!this.audioCtx) {
      return;
    }

    const oscillator = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = note;
    oscillator.start(delay);

    gainNode.gain.value = 0.1;
  };

  createSound = (notes: INotes) => {
    const { firstNote, lastNote } = notes;
    const middleNote: number = 164.81;
    if (this.audioCtx) this.stopSound();

    AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    this.createOscillatorAndGain(firstNote, 0);
    this.createOscillatorAndGain(middleNote, 0.5);
    this.createOscillatorAndGain(lastNote, 1);
  };

  stopSound = () => {
    if (this.audioCtx && this.audioCtx.state === 'running') {
      this.audioCtx.close();
    }
  };
}

export const booper = new Booper();
