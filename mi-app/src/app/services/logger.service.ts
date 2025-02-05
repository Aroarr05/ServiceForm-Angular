import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})

export class LoggerService {
  private events: Event[] = [];

  constructor() {}

  addEvent(event: Event): void {
    this.events.push(event);
  }

  getEvents(category?: 'log' | 'warm' | 'error'): Event[] {
    return category ? this.events.filter(event => event.category === category) : this.events;
  }

  getEventsCount(): { log: number; warm: number; error: number } {
    return this.events.reduce(
      (counts, event) => {
        counts[event.category]++;
        return counts;
      },
      { log: 0, warm: 0, error: 0 }
    );
  }
}
