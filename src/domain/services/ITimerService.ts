export interface ITimerService {
  start(duration: number, onTick: (remaining: number) => void, onComplete: () => void): void;
  pause(): void;
  resume(): void;
  stop(): void;
  getRemainingTime(): number;
}