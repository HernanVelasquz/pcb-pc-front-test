import type { ITimerService } from '../../domain/services/ITimerService';

export class TimerService implements ITimerService {
  private intervalId: number | null = null;
  private remainingTime: number = 0;
  private onTickCallback: ((remaining: number) => void) | null = null;
  private onCompleteCallback: (() => void) | null = null;
  private isPaused: boolean = false;

  start(
    duration: number, 
    onTick: (remaining: number) => void, 
    onComplete: () => void
  ): void {
    this.stop(); // Clear any existing timer
    
    this.remainingTime = duration;
    this.onTickCallback = onTick;
    this.onCompleteCallback = onComplete;
    this.isPaused = false;

    this.intervalId = window.setInterval(() => {
      if (this.isPaused) return;

      this.remainingTime--;
      this.onTickCallback?.(this.remainingTime);

      if (this.remainingTime <= 0) {
        this.stop();
        this.onCompleteCallback?.();
      }
    }, 1000);
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.onTickCallback = null;
    this.onCompleteCallback = null;
  }

  getRemainingTime(): number {
    return this.remainingTime;
  }
}