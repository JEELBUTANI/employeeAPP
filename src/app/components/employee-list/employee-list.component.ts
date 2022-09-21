import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employee?: Employee[];
  currentEmployee: Employee = {
  };
  currentIndex = -1;
  employeeFirstName = '';
  employeeLastNAme = '';
  employeeEmail = '';
  employeeContact = +91;
  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.retrieveEmployee();
  }

  retrieveEmployee(): void {
    this.employeeService.getAll()
      .subscribe({
        next: (data) => {
          this.employee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveEmployee();
    this.currentEmployee = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(employee: Employee, index: number): void {
    this.currentEmployee = employee;
    this.currentIndex = index;
  }

  removeAllEmployee(): void {
    this.employeeService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchEmployeeFirstName(): void {
    this.currentEmployee = {};
    this.currentIndex = -1;

    this.employeeService.findByTitle(this.employeeFirstName)
      .subscribe({
        next: (data) => {
          this.employee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
