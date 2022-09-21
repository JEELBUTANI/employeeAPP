import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee = {
  EmployeeFirstName: '',
  EmployeeLastNAme: '',
  EmployeeEmail:'',
  EmployeeContact:+91,
  };
  submitted = false;


  constructor(private employeeService : EmployeeService) { }

  ngOnInit(): void {
  }
  saveEmployee(): void {
    const data = {
      EmployeeFirstName: this.employee.EmployeeFirstName,
      EmployeeLastNAme: this.employee.EmployeeLastNAme,
      EmployeeEmail:this.employee.EmployeeEmail,
      EmployeeContact:this.employee.EmployeeContact
    };

    this.employeeService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = {
      EmployeeFirstName:'',
      EmployeeLastNAme:'',
      EmployeeEmail:'',
      EmployeeContact:+91,
    };
  }

}
