import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { LoggerService } from '../../services/logger.service';
import { Event } from '../../models/event.model';
import { Employee } from '../../models/employee.model';
import { Client } from '../../models/client.model';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-event-form',
  standalone: true,  
  imports: [CommonModule, FormsModule, BsDatepickerModule],  
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})

export class EventFormComponent {
  employees: Employee[] = [
    { id: 1, name: 'Aroa' },
    { id: 2, name: 'Zahira' },
  ];
  clients: Client[] = [
    { id: 1, name: 'Juan', email: 'juan@gmail.com' },
    { id: 2, name: 'Samuel', email: 'samuel@gmail.com' },
  ];

  event: Partial<Event> = { date: null}; 

  constructor(private loggerService: LoggerService) {}

  onSubmit(): void {
    if (this.event && this.event.date && this.event.employee && this.event.client && this.event.title && this.event.description && this.event.category) {
      const newEvent: Event = {
        id: Date.now(),
        employee: this.event.employee,
        client: this.event.client,
        title: this.event.title,
        description: this.event.description,
        category: this.event.category,
        date: new Date(this.event.date || ''),
        createdDate: new Date(),
      };

      this.loggerService.addEvent(newEvent);
      this.event = {date:null}; 
    }
  }
}
