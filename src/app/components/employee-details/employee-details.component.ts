import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

@Input() viewMode = false;

@Input() currentEmployee: Employee = {
    EmployeeId:'',
    EmployeeFirstName:'',
    EmployeeLastNAme:'',
    EmployeeEmail:'',
    EmployeeContact:+91,
};
  message = '';

  constructor(
    private employeeService : EmployeeService,
    private route : ActivatedRoute,
    private router : Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getEmployee(this.route.snapshot.params["EmployeeId"]);
    }
  }

  getEmployee(EmployeeId: number): void {
    this.employeeService.get(EmployeeId)
      .subscribe({
        next: (data) => {
          this.currentEmployee = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateEmployee(status: string): void {
    const data = {
      EmployeeFirstName: this.currentEmployee.EmployeeFirstName,
      EmployeeLastNAme: this.currentEmployee.EmployeeLastNAme,
      EmployeeEmail: this.currentEmployee.EmployeeEmail,
      EmployeeContact: this.currentEmployee.EmployeeContact,
      EmployeeId: status
    };

    this.message = '';

    this.employeeService.update(this.currentEmployee.EmployeeId, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentEmployee.EmployeeId = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateTutorial(): void {
    this.message = '';

    this.employeeService.update(this.currentEmployee.EmployeeId, this.currentEmployee)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This employee was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteEmployee(): void {
    this.employeeService.delete(this.currentEmployee.EmployeeId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/employee']);
        },
        error: (e) => console.error(e)
      });
  }
}
