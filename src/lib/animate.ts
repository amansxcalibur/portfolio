// we dont use motion in this house

export type Playback = { stop: () => void; finished: Promise<void> };

type Callbacks = {
  delay?: number; // seconds
  onUpdate: (value: number) => void;
  onComplete?: () => void;
};

export type SpringOptions = Callbacks & {
  type: "spring";
  stiffness: number;
  damping: number;
  mass?: number;
};

export type TweenOptions = Callbacks & {
  type?: never;
  duration: number; // seconds
  ease: readonly [number, number, number, number];
};

// progress (0 to 1) and done at t ms
type Sampler = (t: number) => readonly [number, boolean];

function springSampler(
  { stiffness, damping, mass = 1 }: SpringOptions,
  delta: number,
): Sampler {
  const w0 = Math.sqrt(stiffness / mass) / 1000; // rad per ms
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const decay = zeta * w0;

  // position and velocity (per ms) of a unit spring from rest
  let solve: (t: number) => readonly [number, number];
  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    solve = (t) => {
      const env = Math.exp(-decay * t);
      const sin = Math.sin(wd * t);
      return [1 - env * ((decay / wd) * sin + Math.cos(wd * t)), env * ((w0 * w0) / wd) * sin];
    };
  } else if (zeta === 1) {
    solve = (t) => {
      const env = Math.exp(-w0 * t);
      return [1 - env * (1 + w0 * t), w0 * w0 * t * env];
    };
  } else {
    const wh = w0 * Math.sqrt(zeta * zeta - 1);
    const slow = decay - wh;
    const fast = decay + wh;
    const s = (1 + decay / wh) / 2;
    const f = (1 - decay / wh) / 2;
    solve = (t) => {
      const es = s * Math.exp(-slow * t);
      const ef = f * Math.exp(-fast * t);
      return [1 - es - ef, slow * es + fast * ef];
    };
  }

  // motion's thresholds, with its finer ones for small ranges
  const granular = Math.abs(delta) < 5;
  const restSpeed = granular ? 0.01 : 2; // per second
  const restDelta = granular ? 0.005 : 0.5;
  const size = Math.abs(delta);

  return (t) => {
    const [p, v] = solve(t);
    return [p, size * Math.abs(v) * 1000 <= restSpeed && size * Math.abs(1 - p) <= restDelta];
  };
}

function cubicBezier([x1, y1, x2, y2]: TweenOptions["ease"]) {
  const curve = (a: number, b: number) => (t: number) =>
    ((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t * t + 3 * a * t;
  const x = curve(x1, x2);
  const y = curve(y1, y2);
  return (progress: number) => {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 20; i++) {
      const mid = (lo + hi) / 2;
      if (x(mid) < progress) lo = mid;
      else hi = mid;
    }
    return y((lo + hi) / 2);
  };
}

function tweenSampler({ duration, ease }: TweenOptions): Sampler {
  const curve = cubicBezier(ease);
  const ms = duration * 1000;
  return (t) => (t >= ms ? [1, true] : [curve(t / ms), false]);
}

export function animate(
  from: number,
  to: number,
  options: SpringOptions | TweenOptions,
): Playback {
  const sample =
    options.type === "spring" ? springSampler(options, to - from) : tweenSampler(options);
  const delayMs = (options.delay ?? 0) * 1000;

  let resolve!: () => void;
  const finished = new Promise<void>((r) => (resolve = r));
  // the clock starts at the call, like motion's, not on the next frame. the pill
  // restarts its resize every frame while a label settles, and a fresh t=0 each
  // time would freeze it
  const start = performance.now() + delayMs;
  let raf = 0;

  const tick = () => {
    const t = performance.now() - start;
    if (t >= 0) {
      const [p, done] = sample(t);
      options.onUpdate(done ? to : from + (to - from) * p);
      if (done) {
        options.onComplete?.();
        resolve();
        return;
      }
    }
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return { stop: () => cancelAnimationFrame(raf), finished };
}
