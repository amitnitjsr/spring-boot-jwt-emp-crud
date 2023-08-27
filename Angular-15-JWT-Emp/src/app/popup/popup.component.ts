import { Component, Inject, OnInit,Output, EventEmitter, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Output() testEvent = new EventEmitter();

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    @Optional() private dialogref: MatDialogRef<PopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.title = this.data?.title;
    if (this.data.id != '' && this.data.id != null) {
      this.loaduserdata(this.data.id);
    }
  }

  childMethod() {
    console.log("childMethod")
    this.testEvent.emit();
  }

  rolelist: any;
  editdata: any;
  title: any;

  registerform = this.builder.group({
    firstName: this.builder.control(''),
    lastName: this.builder.control(''),
    emailId: this.builder.control(''),
    mobileNumber: this.builder.control(''),
  });

  loaduserdata(id: any) {
    this.service.GetEmployeeById(id).subscribe(res => {
      this.editdata = JSON.parse(res);
      this.registerform.setValue({
        firstName: this.editdata.firstName,
        lastName: this.editdata.lastName, 
        mobileNumber: this.editdata.mobileNumber,
        emailId: this.editdata.emailId,
      });
    });
  }

Closepopup(){
  this.dialogref.close("Close");
}

  UpdateUser() {
    if(this.data.id != '' && this.data.id != null){
      this.service.UpdateEmployee(this.data.id,this.registerform.value).subscribe(result=>{
        this.toastr.success('Employee updated successfully');
        this.Closepopup();
      })
    }
    else{
      this.service.AddCustomer(this.registerform.value).subscribe(result=>{
        this.toastr.success('Employee added successfully');
        this.Closepopup();
      });
    }
  }

}
