import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  //BehaviorSubject guarda el valor mas reciente y lo notifca cuando algo cambia 
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  private selectedEmployeeSubject: BehaviorSubject<Employee | null> = new BehaviorSubject<Employee | null>(null);// ene ste caso estamos selecciona empleado

  constructor() {
    this.loadEmployees();
  }

  //Carga los empleados desde una API
  private loadEmployees() {

    const apiUrl = 'http://localhost:3000/employee';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.employeesSubject.next(data);
      })
      .catch(error => console.error('Error al cargar los empleados:', error));
  }

  //Obtenemos los empleados como un obserbable 
  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  //Seleccionamos el empleado y recibimos su id 
  selectEmployee(id: number): void {
    console.log(id)
    //Buscamos el emplado que coincide con la id, colocamos number por que id es un numero pero emp.id es un objeto 
    const employee = this.employeesSubject.value.find(emp => Number(emp.id) === Number(id));
    console.log(employee)
    if (employee) {
      console.log('Empleado a almacenar en localStorage:', employee);
      localStorage.setItem('selectedEmployee', JSON.stringify(employee));//guardamos el empleado en localstorage 
      this.selectedEmployeeSubject.next(employee);// actualizamos con el next (el BehaviorSubject)
    }
  }

  //Obtenemos el empleado seleccionado 
  getSelectedEmployee(): Observable<Employee | null> {
    if (typeof localStorage !== 'undefined') { // comprobamos que este en localStorage
      const savedEmployee = localStorage.getItem('selectedEmployee');//lo pillamos 
      if (savedEmployee) {
        this.selectedEmployeeSubject.next(JSON.parse(savedEmployee));//si lo encontramos usamos el behaviorSunject con el empleado guardado
      }
    }
    return this.selectedEmployeeSubject.asObservable();
  }

}
