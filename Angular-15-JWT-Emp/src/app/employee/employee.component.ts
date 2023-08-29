import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import {PopupComponent} from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  pageEvent: PageEvent;
  displayedColumns: string[] = ['id', 'firstName','lastName', 'emailId', 'mobileNumber', 'action'];

  constructor(
    private service: AuthService,
    private toastr: ToastrService,
    private matDialog: MatDialog,
    
    private router: Router) 
    {
      // this.loadEmployee();
    };

  customerlist: any;
  dataSource: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  page = 0;
  size = 5;

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.initialDataSource(this.page, this.size);
  }

  initialDataSource(page: number, size: number) {
    this.service.GetAllEmployee(page, size, "id", "asc")
    .pipe(
      map((employeeData) => {
        employeeData = JSON.parse(employeeData);
        employeeData.itemsPerPage = size;
        this.dataSource = (employeeData);
      })
    ).subscribe()
  }

  onPaginateChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.initialDataSource(this.page, this.size);
  }

  updateEmployee(id: string) {
    const popup = this.matDialog.open(PopupComponent,{
      data: {
        title: 'Edit',
        id: id
      }
    });

    popup.afterClosed().subscribe(()=>{
      console.log("popup closed")
      this.initialDataSource(this.page, this.size);
    });
    
  }

  removeEmployee(id: string) {
    this.service.DeleteEmployee(id).subscribe(result=>{
      this.toastr.warning("Employee Deleted Successfully");
      this.initialDataSource(this.page, this.size);
    },
    (err) => {
      console.log('err.....', err, err?.status)
    })
  }

  addEmployee() {
   const popup = this.matDialog.open(PopupComponent,{
      data: {
        title: 'Add',
        id: ''
      }
    });
    popup.afterClosed().subscribe(()=>{
      console.log("popup closed")
      this.initialDataSource(this.page, this.size);
    })
  }

  // parentMethod(){
  //   console.log("parentMethod")
  // }
}
