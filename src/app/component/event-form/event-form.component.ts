import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/employee.model';
import { EventM } from '../../model/event.model';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';// se le añade para la fecha
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BsDatepickerModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  // Configuración para el datepicker (calendario) de ngx-bootstrap
  bsConfig = {
    dateInputFormat: 'DD-MM-YYYY',
    isAnimated: true,
    containerClass: 'theme-dark-blue',
    adaptivePosition: true
  };

  empleado: Employee | null = null; //Almacenamos el empleado
  employees: Employee[] = []; //Almacenamos todos los empleados 
  eventForm: FormGroup; //Formulario reactivo para el evento

  //Añadimos el datepicker para la fecha
  //npm install ngx-bootstrap --save

  //Intalar json 
  //npm install -g json-server
  //Ejecutar el json
  //json-server --watch (employee.json) Nombre del archivo

  /*PARA NO TENER QUE ABRIR DOS TERMINALES:
    npm install -g json-server 
    npm install concurrently --save-dev --forcé

    "inicio":"concurrently \"json-server db.json\" \"ng serve\"",

    npm run inicio
  */


  //instalar bootstrap
  //npm install bootstrap jquery @popperjs/core
  //añadir en el angular.json los estilos y scripts

  
  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private eventService: EventService
  ) {
    /**Inicializar el formulario con los campos y calidadores 
    Validators.required -> se usa en los formularios rectivos, marca un campo como obligatorio
     */
    
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      client: ['', Validators.required],
      date: ['', [Validators.required, this.dateValidator]],
      description: ['', Validators.required],
      classification: ['log', Validators.required],
      employee: [null]
    });
  }

  ngOnInit() {
    //Se obtine los empleados y se almacenan en el arrya 'employees'
    //.subscribe() permite escuchar un observable y ejecutar un callback cada vez que ese observable emite un valor
    // callback-> es una funcion que se pasa como argumento a otra funcion, esta funcion se ejecutará en algún momento posterior, cuando ocurra algo específico
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
    //Obtenemos el empleado seleccionado y actualiza el formulario si hay uno seleccionado
    //.patchValue -> es un metodo que se usa para actualizar los valores de un formulario de manera parcial.
    this.employeeService.getSelectedEmployee().subscribe(empleado => {
      if (empleado) {
        this.empleado = empleado;
        this.eventForm.patchValue({ employee: empleado.id });
      }
    });
  }

  // se ejecuta cuando el formulario este valido 
  onSubmit() {
    if (this.eventForm.valid) {
      const selectedEmployee = this.employees.find(emp => emp.id === this.eventForm.value.employee);
      if (!selectedEmployee) {
        console.error('No hay empleado seleccionado');
        return;
      }

      //Creo un objeto event con los valores del formuario
      const event: EventM = {
        id: new Date().getTime(),
        employee: selectedEmployee,
        title: this.eventForm.value.title,
        client: this.eventForm.value.client,
        date: this.eventForm.value.date,
        description: this.eventForm.value.description,
        classification: this.eventForm.value.classification,
        creationDate: new Date()
      };

      this.eventService.addEvent(event);
      this.eventForm.reset();
    }
  }

  // Validacion
  dateValidator(control: any) {
    if (!control.value) {
      return { required: true };
    }

    const selectedDate = new Date(control.value);
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    return selectedDate >= lastMonth && selectedDate <= today ? null : { invalidDate: true };
  }
}
