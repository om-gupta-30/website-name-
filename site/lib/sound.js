let audioContext;

const getContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    audioContext = new AudioCtx();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
};

const playTone = ({
  frequency = 440,
  duration = 0.12,
  type = "sine",
  gainValue = 0.06,
  detune = 0,
}) => {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.detune.setValueAtTime(detune, now);
  gain.gain.setValueAtTime(gainValue, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
};

export const playTap = () => {
  playTone({ frequency: 360, duration: 0.08, type: "triangle", gainValue: 0.045 });
};

export const playHover = () => {
  playTone({ frequency: 540, duration: 0.12, type: "sine", gainValue: 0.03 });
};

export const playSwoosh = () => {
  const ctx = getContext();
  if (!ctx) return;

  const duration = 0.35;
  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(220, now);
  oscillator.frequency.exponentialRampToValueAtTime(660, now + duration);
  gain.gain.setValueAtTime(0.02, now);
  gain.gain.linearRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
};

