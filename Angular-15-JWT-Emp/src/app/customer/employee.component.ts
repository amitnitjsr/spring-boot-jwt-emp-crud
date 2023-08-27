import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import {PopupComponent} from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {

  constructor(
    private service: AuthService,
    private toastr: ToastrService,
    private matDialog: MatDialog,
    private router: Router) 
    {
      this.loadEmployee();
    };

  customerlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  accessdata: any;
  haveedit = true;
  haveadd = true;
  havedelete = true;

  ngAfterViewInit(): void {

  }

  loadEmployee() {
    this.service.GetAllCustomer().subscribe(res => {
    
      this.customerlist = JSON.parse(res);
      this.dataSource = new MatTableDataSource(this.customerlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['id', 'firstName','lastName', 'emailId', 'mobileNumber', 'action'];

  updateEmployee(id: string) {
    
    const popup = this.matDialog.open(PopupComponent,{
      data: {
        title: 'Edit',
        id: id
      }
    });

    popup.afterClosed().subscribe(()=>{
      console.log("popup closed")
      this.loadEmployee();
    });
    
  }

  removeEmployee(id: string) {
    this.service.DeleteEmployee(id).subscribe(result=>{
      this.toastr.warning("Employee Deleted Successfully");
      this.loadEmployee();
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
      this.loadEmployee();
    })
  }

  // parentMethod(){
  //   console.log("parentMethod")
  // }
}
