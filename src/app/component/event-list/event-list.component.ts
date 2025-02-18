import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventM } from '../../model/event.model';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: EventM[] = [];
  selectedClassification: 'log' | 'warn' | 'error' | 'all' = 'all';  // Agregar 'all' como opción

  
  //Formulario rectivo con solo un controol: 'classificatorion' (clasificación de eventos)
  filterForm: FormGroup = new FormGroup({
    classification: new FormControl(this.selectedClassification)
  });

  //Añadimos el servicio EventService
  constructor(private eventService: EventService, private router: Router) { }

  
  ngOnInit() {
    this.eventService.loadEvents(); // cargamos los eventos del servicio
    this.events = this.eventService.getEvents(); // inicializa la lista de eventos con los eventos obtenidos del servicio
  }
  
  // este metodo se ejecuta cuando se cambia el filtro de clasificación
  onFilterChange(event: Event){
    const selectedClassification = (event.target as HTMLSelectElement).value; //obtiene la clasificación seleccionada
    if (selectedClassification === 'all'){ // si usamos all  mustra todos los eventos 
      this.events = this.eventService.getEvents();// obtenemos todos los eventos
    }else{
      //si se selecciona una clasificación especifica, filtra los eventos por la clasificatoria 
      this.events = this.eventService.getEvents().filter(e => e.classification === selectedClassification);
      //llama al método que calcula cuántos eventos pertenecen a esa clasificación 
      this.getEventCount(selectedClassification);
    }
  }

  //Buscamos los eventos que pertenecen a la clasificatoria dada
  getEventCount(classification: string): number {
    return this.events.filter(event => event.classification === classification).length;
  }
  
  /*//Método que se ejecuta cuando se elimina un evento
  onDeleteEvent(event: EventM){
    this.eventService.deleteEvent(event); //llama al método del servicio para eliminar el evento
    this.events = this.eventService.getEvents(); //actualiza la lista de eventos
  }*/

  /*
  onEditEvent(event: EventM) {
    this.eventService.setEventToEdit(event); // Guarda el evento a editar
    this.router.navigate(['/edit-form']); // Navega al formulario
  }*/

}