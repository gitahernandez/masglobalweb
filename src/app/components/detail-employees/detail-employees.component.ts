import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-detail-employees',
  templateUrl: './detail-employees.component.html',
  styleUrls: ['./detail-employees.component.scss']
})
export class DetailEmployeesComponent implements OnInit {

  @Input() employees: Employee[]; 

  constructor() { }

  ngOnInit(): void {
  }

}
