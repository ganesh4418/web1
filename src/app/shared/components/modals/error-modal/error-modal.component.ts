import { Component, OnInit,Optional,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  errorMsg : string ='';

  constructor(public dialogRef: MatDialogRef<ErrorModalComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data:any) { 
    this.errorMsg = this.data;
  }

  ngOnInit(): void {
    this.errorMsg = this.data;
  }

}
