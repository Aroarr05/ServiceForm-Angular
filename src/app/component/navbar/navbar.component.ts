import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-navbar',
  standalone: true, // permite que el componente no necesite un módulo externo
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  
  employees: Employee[] = [];
  selectedEmployeeName: string = 'No employee selected';  // Nombre del empleado seleccionado
  employeeControl = new FormControl<number | null>(null);  //Control del formulario para seleccionar un empleado 

  //Añadimos el servicio EmployeeService
  constructor(private employeeService: EmployeeService) {}


  ngOnInit(): void { //Despuede de cargar la pagina se ejecita esto

    //Obtenenemos empleado y guardamos la variable
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });

    //Obtenemos el empleado seleccionado y actualiza la interfaz
    this.employeeService.getSelectedEmployee().subscribe(selectedEmployee => {
      if (selectedEmployee) {
        this.selectedEmployeeName = selectedEmployee.name || selectedEmployee.name;  
        this.employeeControl.setValue(selectedEmployee.id, { emitEvent: false });  
      } else {
        this.selectedEmployeeName = 'No employee selected';
      }
    });

    //Cuando el usuario selecciona un empleado,actualizarlo 
    this.employeeControl.valueChanges.subscribe(employeeId => {
      console.log('Empleado seleccionado:', employeeId);
      const selectedId = Number(employeeId);
      this.employeeService.selectEmployee(selectedId);
    });
  }
}
