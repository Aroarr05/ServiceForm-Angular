import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { EventM } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})

export class LoggerService {

  //Logger necesita el ecentoService
  constructor(private eventService: EventService) { }

  //Agregamos un nuevo evento
  addEvent(event: EventM) {
    this.eventService.addEvent(event);
  }

  // filtramos segun la clasificación
  filterEvents(classification: 'log' | 'warn' | 'error') {
    return this.eventService.filterEvents(classification);
  }

  //obtenemos todo los ecentos registrados 
  getEvents() {
    return this.eventService.getEvents();
  }
}
