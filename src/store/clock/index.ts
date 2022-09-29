import { defineStore } from 'pinia';
import { State } from './clock.types';

export const useClockStore = defineStore('clock', {
  state: () => {
    return {
      time: new Date(),
    } as State;
  },
  getters: {
    getTimeHours: (state): number => state.time.getHours(),
    getTimeMinutes: (state): number => state.time.getMinutes(),
    getTimeSeconds: (state): number => state.time.getSeconds(),
    getTimeMessage(): string {
      const hh = this.getTimeHours < 10 ? `0${this.getTimeHours}` : this.getTimeHours;
      const mm = this.getTimeMinutes < 10 ? `0${this.getTimeMinutes}` : this.getTimeMinutes;
      const ss = this.getTimeSeconds < 10 ? `0${this.getTimeSeconds}` : this.getTimeSeconds;

      return `${hh}:${mm}:${ss}`;
    },
  },
  actions: {
    setTime(value: Date): void {
      this.time = value;
    },
  },
});
