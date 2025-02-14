import { Employee } from "./employee.model";

export interface EventM {
  id: number;
  employee: Employee;
  title: string;
  client: string;
  date: Date;
  description: string;
  classification: 'log' | 'warn' | 'error' | 'all';
  creationDate: Date;
}