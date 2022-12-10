import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  employees?: Employee[];
  private subscription: Subscription = Subscription.EMPTY;

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.subscription = this.employeesService
      .getAllEmployees()
      .subscribe((response) => {
        this.employees = response;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = Subscription.EMPTY;
  }

  deleteEmployee(id?: string): void {
    if (id) {
      this.employeesService.deleteEmployee(id).subscribe((_) => {
        this.employees = this.employees?.filter((e) => e.id !== id);
      });
    }
  }
}
