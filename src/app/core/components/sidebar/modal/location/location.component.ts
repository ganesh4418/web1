import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss', './../contact/contact.component.scss']
})
export class LocationComponent implements OnInit {
  scheduleForm:FormGroup;
  submitted:boolean=false;
  constructor(public locationDialogRef: MatDialogRef<LocationComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.scheduleForm=new FormGroup({
      firstName: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
      lastName: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
      contactNo: new FormControl('', [Validators.required,Validators.pattern('^[0-9 ]*$')]),
      email: new FormControl('',[Validators.required, Validators.email,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      dateAndTime:new FormControl('',Validators.required),
      office:new FormControl('', Validators.required),
      meetingMsg:new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  get scheduleFormControl(){
    return this.scheduleForm.controls;
  } 

  closeDialog() {
    this.locationDialogRef.close('hi');
  }

  onSubmit(formData:any){
    // console.log(this.scheduleForm.value)
    this.submitted=true;
    this.locationDialogRef.close({data:formData.value});
  }


}
