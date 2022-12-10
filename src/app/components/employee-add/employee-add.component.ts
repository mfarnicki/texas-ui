import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  newEmployee: Employee = {
    name: '',
    email: '',
    phone: 0,
  };

  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramsMap) => {
      const id = paramsMap.get('id');
      if (id) {
        this.employeesService.getEmployee(id).subscribe((response) => {
          this.newEmployee = response;
        });
      }
    });
  }

  saveEmployee() {
    let saveObservable: Observable<Employee>;
    if (!this.newEmployee.id) {
      saveObservable = this.employeesService.addEmployee(this.newEmployee);
    } else {
      saveObservable = this.employeesService.updateEmployee(
        this.newEmployee.id,
        this.newEmployee
      );
    }

    saveObservable.subscribe((_) => this.router.navigate(['employees']));
  }
}
