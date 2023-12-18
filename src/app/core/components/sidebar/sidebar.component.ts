import { Component, OnInit, Inject } from '@angular/core';
import { sidebar } from './../../../core/mocks/sidebar'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactComponent } from './modal/contact/contact.component';
// import { MailComponent } from './modal/mail/mail.component';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { Router } from '@angular/router';
import { StaticDataService } from 'src/app/shared/services/static-data.service';
import { environment } from 'src/environments/environment';
import { Urls } from '../../mocks/api-endpoints';
import { Prefixes } from '../../mocks/prefixes';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';

// import { LocationComponent } from './modal/location/location.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  leftmenu: any;
  isContactPopUp: boolean = false;
  isCommentClicked: boolean = false;
  isMailClicked: boolean = false;
  isLocationClicked: boolean = false;
  clickedMenu: boolean = false;
  defaultMenu: boolean = true;

  scrollStrategy: ScrollStrategy;

  constructor(private readonly sso: ScrollStrategyOptions,public dialog: MatDialog, private dialogRef: MatDialog, private breadcumDataService: BreadcumDataService, private router:Router, private staticDataService:StaticDataService) {
    let sidebar_menu = new sidebar();
    this.leftmenu = sidebar_menu.side_menu;
    this.scrollStrategy = this.sso.noop();
  }

  ngOnInit(): void {
    
  }

  changeIcon(menu: any) {
    switch (menu.title) {
      case "About Us":
        this.clickedMenu = true
        break;

      default:
        this.clickedMenu = false
        break;
    }
    if (menu.title === "Gallery") {      
      this.breadcumDataService.changeData('');
    }

  }
  contact(): void {
    this.isContactPopUp = true;
    this.dialogRef.closeAll();
    const dialogRef = this.dialog.open(ContactComponent, {
      width: 'auto',
      hasBackdrop: false,
      panelClass: 'custom-modalbox',
      scrollStrategy: this.scrollStrategy
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isContactPopUp = result;
    });

  }

  mail(): void {
    this.isMailClicked = true;
    this.dialogRef.closeAll();
    const dialogRef = this.dialog.open(MailComponent, {
      width: 'auto',
      panelClass: 'custom-modalbox',
      hasBackdrop: false,
      scrollStrategy: this.scrollStrategy
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isMailClicked = result.isSuccess;
      if(result.isSuccess){
        this.staticDataService.setSubmittedData({email:result.email, code:result.code,highlitedtitle:"Write", nothighlitedtitle:"Us"})
          this.breadcumDataService.changeData('Write Us');
          this.router.navigate(['/submitted'])
      }
    });
  }

  location(): void {
    this.isLocationClicked = true;
    this.dialogRef.closeAll();
    const dialogRef = this.dialog.open(LocationComponent, {
      width: 'auto',
      height: 'auto',
      panelClass: 'custom-modalbox',
      scrollStrategy: this.scrollStrategy
    });
    dialogRef.afterClosed().subscribe((result) => {
if(result!=undefined){
  this.isLocationClicked = result.isSuccess;
  if(result.isSuccess){
    this.staticDataService.setSubmittedData({email:result.email, code:result.code,highlitedtitle:"Schedule Meeting", nothighlitedtitle:"With Us"})
      this.breadcumDataService.changeData('Schedule Meeting With Us');
      this.router.navigate(['/submitted'])
  }
}
      
    });

  }

}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./modal/location/location.component.scss', './modal/contact/contact.component.scss']
})
export class LocationComponent implements OnInit {
  minDate: any;
  maxDate: any = "2023-4-30";
  prefixes:any;
  minMobileLength:number=5;
  maxMobileLength:number=14;
  mobileNoPrefix:any;
  prefixValid:boolean=false;
  scheduleForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    country: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    contactPreNo: new FormControl(''),
    contactNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'),Validators.minLength(5),Validators.maxLength(14)]),
    email: new FormControl('', [Validators.required, Validators.email,
    Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    dateAndTime: new FormControl('', Validators.required),
    selectMeetingMode:new FormControl('', Validators.required),
    // office: new FormControl('disabled', Validators.required),
    meetingMsg: new FormControl('', Validators.required)
  });

  constructor(public locationDialogRef: MatDialogRef<LocationComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService) { }

  ngOnInit(): void {
    const d = new Date();
    let text: any = d.toISOString();
    text = text.split('T');
    this.minDate = "2023-1-30";
    let prefixes = new Prefixes();
    this.prefixes = prefixes.countriesData;
  }

  get scheduleFormControl() {
    return this.scheduleForm.controls;
  }

  closeDialog() {
    let data={
      isSuccess:false
    }
    this.locationDialogRef.close(data);
  }

  onSelectChange(event: any) {
    for (let i in this.prefixes) {
      if (this.prefixes[i].name == event.target.value) {
        if(this.prefixes[i].moblie_prefix.length!=0){
          let mobileNoPrefix=[];
          mobileNoPrefix=this.prefixes[i].moblie_prefix;
          this.minMobileLength=this.prefixes[i].min_mobile_no_size;
          this.maxMobileLength=this.prefixes[i].max_mobile_no_size;
          this.scheduleForm.controls['contactNo'].setAsyncValidators([this.mobilePrefixValidator(mobileNoPrefix)]);
          this.scheduleForm.controls['contactNo'].setValidators([Validators.required,Validators.minLength(this.prefixes[i].min_mobile_no_size),Validators.maxLength(this.prefixes[i].max_mobile_no_size)]);
          this.scheduleForm.get('contactNo')?.updateValueAndValidity();
        }
        this.scheduleForm.patchValue({
          contactPreNo: this.prefixes[i].dial_code,
        });
      }
    }
  }

  mobilePrefixValidator(mNumber: any):AsyncValidatorFn  {
    return (control: AbstractControl):Observable<ValidationErrors>|Observable<null> => {
      let bReturn:boolean=false;
       for(let i in mNumber){
        if(!control.value.startsWith(mNumber[i])){
          bReturn=true;
        } else{
          bReturn=false;
          break;
        }
       }
       console.log(bReturn)
       let err:ValidationErrors={ prefixValid: true };
       return bReturn?of(err):of(null);
    }
  }

  onSubmit(formData: any) {
    if(formData.valid){
      let data={
        firstName:formData.value.firstName,
        lastName:formData.value.lastName,
        country:formData.value.country,
        email:formData.value.email,
        contactNumber:formData.value.contactPreNo+formData.value.contactNo,
        selectMeetingMode:formData.value.selectMeetingMode,
        briefForTheMeeting:formData.value.meetingMsg,
        // selectOffice:formData.value.office,
        date:formData.value.dateAndTime.substring(0, 10),
        time:formData.value.dateAndTime.substring(11, 16),
       }
        this.httpService.post(environment.apiUrl+Urls.API_ENDPOINT.scheduleMeeting,data).subscribe(
          response=>{
            let data={
              email:response.email,
              code:response.referenceKey,
              isSuccess:true
            }
            this.locationDialogRef.close(data);
          },
          error=>{
            let data={
              isSuccess:false
            }
            this.locationDialogRef.close(data);
          }
        )
     }
  }

}


@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./modal/mail/mail.component.scss', './modal/contact/contact.component.scss']
})
export class MailComponent implements OnInit {
  prefixes:any;
  touchForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    country: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    contactPreNo: new FormControl(''),
    contactNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5),Validators.maxLength(14)]),
    email: new FormControl('', [Validators.required, Validators.email,
    Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    budget: new FormControl('',[Validators.pattern('^[0-9]*$')]),
    msg: new FormControl('', Validators.required)
  });
  toasts: any[] = [];
  minMobileLength:number=5;
  maxMobileLength:number=14;
  mobileNoPrefix:any;
  constructor(public locationDialogRef: MatDialogRef<LocationComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService) { }

  ngOnInit(): void {
    let prefixes = new Prefixes();
    this.prefixes = prefixes.countriesData;
  }

  get stouchFormControl() {
    return this.touchForm.controls;
  }

  

  closeDialog() {
    this.locationDialogRef.close(false);
  }

  onSelectChange(event: any) {
    for (let i in this.prefixes) {
      if (this.prefixes[i].name == event.target.value) {
        if(this.prefixes[i].moblie_prefix.length!=0){
          let mobileNoPrefix=[];
          mobileNoPrefix=this.prefixes[i].moblie_prefix;
          this.minMobileLength=this.prefixes[i].min_mobile_no_size;
          this.maxMobileLength=this.prefixes[i].max_mobile_no_size;
          this.touchForm.controls['contactNo'].setAsyncValidators([this.mobilePrefixValidator(mobileNoPrefix)]);
          this.touchForm.controls['contactNo'].setValidators([Validators.minLength(this.prefixes[i].min_mobile_no_size),Validators.maxLength(this.prefixes[i].max_mobile_no_size)]);
          this.touchForm.get('contactNo')?.updateValueAndValidity();

        }
        this.touchForm.patchValue({
          contactPreNo: this.prefixes[i].dial_code,
        });
      }
    }
  }

  mobilePrefixValidator(mNumber: any):AsyncValidatorFn  {
    return (control: AbstractControl):Observable<ValidationErrors>|Observable<null> => {
      let bReturn:boolean=false;
      for(let i in mNumber){
        if(!control.value.startsWith(mNumber[i])){
          bReturn=true;
        } else{
          bReturn=false;
          break;
        }
       }
       let err:ValidationErrors={ prefixValid: true };
          return bReturn?of(err):of(null);
     }
}


  onSubmit(formData: any) {
   let date=new Date();
   if(formData.valid){
    let data={
      firstName:formData.value.firstName,
      lastName:formData.value.lastName,
      country:formData.value.country,
      email:formData.value.email,
      contactNumber:formData.value.contactPreNo+formData.value.contactNo,
      briefForTheMeeting:formData.value.msg,
      date:date.toISOString().split('T')[0],
      time:date.toISOString().substring(17, 24)
     }

      this.httpService.post(environment.apiUrl+Urls.API_ENDPOINT.writeUs,data).subscribe(
        response=>{
          let data={
            email:response.email,
            code:response.referenceKey,
            isSuccess:true
          }
          this.locationDialogRef.close(data);
        },
        error=>{
          let data={
            isSuccess:false
          }
          this.locationDialogRef.close(data);
        }
      )
   }


  }

  remove(index: number) {
    this.toasts = this.toasts.filter((v, i) => i !== index);
    //this.toasts.splice(index, 1);
  }

}

