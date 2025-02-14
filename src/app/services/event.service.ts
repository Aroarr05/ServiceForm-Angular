import { Injectable } from '@angular/core';
import { EventM } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  //Almacena los eventos
  private events: EventM[] = [];

  constructor() {
    this.loadEvents();
  }

  //Carga los eventos de localStorage si existen
  loadEvents() {
    if (typeof localStorage !== 'undefined') {
      const savedEvents = localStorage.getItem('events');
      if (savedEvents) {
        this.events = JSON.parse(savedEvents);
      }
    }
  }

  //Añadimos un nuevo evento a la lista y lo guarda en localStorage
  addEvent(event: EventM) {
    this.events.push(event);
    this.saveEvents();
  }

  //Guarda la lista de eventos en localStorage
  saveEvents() {
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  //Filtramos los eventos
  filterEvents(classification: 'log' | 'warn' | 'error' | 'all'): EventM[] {
    if (classification === 'all') {
      return this.events;
    }
    return this.events.filter(event => event.classification === classification);
  }

  //Devolvemos todos los eventos almacenados 
  getEvents(): EventM[] {
    return this.events;
  }

}
