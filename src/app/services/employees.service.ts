import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../constants/label-url-services';
import { Employee } from '../models/employee';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

public urlEmployeeService = UrlService.urlEmployeeService;
public urlEmployeeById = UrlService.urlEmployeeById;
public getEmployeesSource = new Subject<Employee[]>();
public employeesResponse$ = this.getEmployeesSource.asObservable();
public getEmployeeSource = new Subject<Employee>();
public employeeResponse$ = this.getEmployeeSource.asObservable();

  constructor(private http: HttpClient) { }
  public getEmployees() {
    this.http.get<Employee[]>(this.urlEmployeeService).subscribe((employees)=> {
      this.getEmployeesSource.next(employees);
    });
  }

  public getEmployeeById(employeeId:number) {
    this.http.get<Employee>(`${this.urlEmployeeById}${employeeId}`).subscribe((employee:Employee)=> {
      this.getEmployeeSource.next(employee);
    });
  }

}
