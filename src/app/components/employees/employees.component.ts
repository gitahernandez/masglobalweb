import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/employee';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private _employee:EmployeesService ) { }

  public employeeId:number = null;
  public employees:Employee[] = [];
  private resultsMainSubscription:Subscription;

  ngOnInit(): void {    
    this.setupObservableSubscription();
  }

  ngOnDestroy(): void {
    if(this.resultsMainSubscription){
      this.resultsMainSubscription.unsubscribe();
    }
  }


  private setupObservableSubscription() {
    this.resultsMainSubscription = new Subscription();
    this.resultsMainSubscription.add(this._employee.employeesResponse$.subscribe(employees =>{
            this.getData(employees);
    }));
    this.resultsMainSubscription.add(this._employee.employeeResponse$.subscribe(employee =>{
        this.getDataById(employee);
    }));
  }

  setEmployeeId = () => {
    this.employees = []
    if(this.employeeId !== null ){
      this._employee.getEmployeeById(this.employeeId);
    }else{
      this._employee.getEmployees();
    }
    this.employeeId = null
  }

  getData = (employee:Employee[]) =>{
    console.log("Llega"+ JSON.stringify(employee));
    this.employees = (this.employeeId === null) && employee;
  }

  getDataById = (employee:Employee) =>{
        this.employees.push(employee);
  }

  

}
