import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { LoggerService } from '../../services/logger.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-list',
  standalone: true,  
  imports: [CommonModule],  
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {

  allEvents: Event[] =[];
  events: Event[] = [];
  eventsCount = { log: 0, warm: 0, error: 0 };

  constructor(private loggerService: LoggerService) {}

  ngOnInit(): void {
    this.allEvents= this.loggerService.getEvents();
    this.updateEventCount();
    this.events = [...this.allEvents];
  }

  updateEventCount(): void {
    this.eventsCount={
      log: this.allEvents.filter(event => event.category === 'log').length,
      warm: this.allEvents.filter(event => event.category === 'warm').length,
      error: this.allEvents.filter(event => event.category === 'error').length
    }
  }

  onFilterCategory(category: string): void {
   this.events = this.allEvents.filter(event => event.category === category);
  }
}
