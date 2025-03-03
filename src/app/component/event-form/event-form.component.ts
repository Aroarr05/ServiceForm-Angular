import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../model/employee.model';
import { EventM } from '../../model/event.model';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BsDatepickerModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  bsConfig = {
    dateInputFormat: 'DD-MM-YYYY',
    isAnimated: true,
    containerClass: 'theme-dark-blue',
    adaptivePosition: true
  };

  empleado: Employee | null = null;
  employees: Employee[] = [];
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private eventService: EventService
  ) {
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
    this.loadFormFromLocalStorage();

    this.eventForm.valueChanges.subscribe(() => {
      this.saveFormToLocalStorage();
    });

    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });

    this.employeeService.getSelectedEmployee().subscribe(empleado => {
      if (empleado) {
        this.empleado = empleado;
        this.eventForm.patchValue({ employee: empleado.id });
      }
    });
  }

  private saveFormToLocalStorage() {
    localStorage.setItem('eventFormData', JSON.stringify(this.eventForm.value));
  }

  private loadFormFromLocalStorage() {
    const savedForm = localStorage.getItem('eventFormData');
    if (savedForm) {
      this.eventForm.patchValue(JSON.parse(savedForm));
    }
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const selectedEmployee = this.employees.find(emp => emp.id === this.eventForm.value.employee);
      if (!selectedEmployee) {
        console.error('No hay empleado seleccionado');
        return;
      }

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
      localStorage.removeItem('eventFormData'); 
      this.eventForm.reset();
    }
  }

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
