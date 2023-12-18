import { Component, OnInit } from '@angular/core';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { Position } from 'src/app/core/mocks/hiring';
import { FilteredDataService } from 'src/app/shared/services/filtered-data.service';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { StaticDataService } from 'src/app/shared/services/static-data.service';
import { CountryList } from 'src/app/core/mocks/countries';
import { Prefixes } from 'src/app/core/mocks/prefixes';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { Urls } from 'src/app/core/mocks/api-endpoints';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from 'src/app/shared/components/modals/error-modal/error-modal.component';

@Component({
  selector: 'app-hiring-details',
  templateUrl: './hiring-details.component.html',
  styleUrls: ['./hiring-details.component.scss']
})
export class HiringDetailsComponent implements OnInit {
  jobDetails: any;
  open_hiring: any;
  isApply: boolean = false;
  prefixes: any;
  submitted: boolean = false;
  fileName: string = '';
  isSubmitted: boolean = false;
  highlitedtitle: string = "We're";
  nothighlitedtitle: string = "Hiring";
  file!:File;
  minMobileLength:number=5;
  maxMobileLength:number=14;
  mobileNoPrefix:any;
  errorMsg : string='';
  jobApplyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    country: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    contactPreNo: new FormControl(''),
    contactNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'),Validators.minLength(5),Validators.maxLength(14)]),
    altContactPreNo: new FormControl(''),
    altContactNo: new FormControl('', [Validators.pattern('^[0-9]*$'),Validators.minLength(5),Validators.maxLength(14)]),
    email: new FormControl('', [Validators.required, Validators.email,
    Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    address: new FormControl('', [Validators.required]),
    workLink: new FormControl(''),
    resume : new FormControl('',[Validators.required])
  });
  showErrorMsg : boolean = false;

  constructor(private breadcumDataService: BreadcumDataService, private filteredDataService: FilteredDataService, private httpService:HttpService, private staticDataService:StaticDataService, private router:Router,public dialog: MatDialog) {
    let hiring = new Position();
    this.open_hiring = hiring.opening;
    let prefixes = new Prefixes();
    this.prefixes = prefixes.countriesData;
    // this.prefixes=[...new Set(prefixes.number)];
    // this.prefixes=this.prefixes.sort();

  }

  ngOnInit(): void {
    this.breadcumDataService.changeData('');
    this.filteredDataService.currentJob.subscribe(
      data => {
        this.jobDetails = this.open_hiring[data];
      }
    )
    console.log(this.jobApplyForm.get('contactNo')?.value);
    
    if(this.jobApplyForm.get('contactNo')?.value == this.jobApplyForm.get('altContactNo')?.value){
      this.showErrorMsg = true;
    }
  }
  get jobApplyFormControl() {
    return this.jobApplyForm.controls;
  }

  onSelectChange(event: any) {
    for (let i in this.prefixes) {
      if (this.prefixes[i].name == event.target.value) {
        if(this.prefixes[i].moblie_prefix.length!=0){
          let mobileNoPrefix=[];
          mobileNoPrefix=this.prefixes[i].moblie_prefix;
          this.minMobileLength=this.prefixes[i].min_mobile_no_size;
          this.maxMobileLength=this.prefixes[i].max_mobile_no_size;
          this.jobApplyForm.controls['contactNo'].setAsyncValidators([this.mobilePrefixValidator(mobileNoPrefix)]);
          this.jobApplyForm.controls['contactNo'].setValidators([Validators.required,Validators.minLength(this.prefixes[i].min_mobile_no_size),Validators.maxLength(this.prefixes[i].max_mobile_no_size)]);
          this.jobApplyForm.get('contactNo')?.updateValueAndValidity();
          this.jobApplyForm.controls['altContactNo'].setAsyncValidators([this.mobilePrefixValidator(mobileNoPrefix)]);
          this.jobApplyForm.controls['altContactNo'].setValidators([Validators.required,Validators.minLength(this.prefixes[i].min_mobile_no_size),Validators.maxLength(this.prefixes[i].max_mobile_no_size)]);
          this.jobApplyForm.get('altContactNo')?.updateValueAndValidity();
        }
        this.jobApplyForm.patchValue({
          contactPreNo: this.prefixes[i].dial_code,
          altContactPreNo: this.prefixes[i].dial_code
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

  onApply() {
    this.isApply = true;
    this.isSubmitted = false;
  }

  readFile(fileEvent: any) {
    const file = fileEvent.target.files[0];
    let fileSize = ((file.size) / 1048576);

    if ((fileSize < 5) && (file.type == 'application/pdf' || file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type == 'application/msword')) {
      console.log('size', file.size);
      console.log('in', file.type);
      this.fileName = file.name;
      this.file=file;
    } else {
      this.fileName = '';
      console.log(this.file);
    }

  }


  //  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   this.dialog.open(DialogAnimationsExampleDialog, {
  //     width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }

  onSubmit(form: any) {
    this.submitted = true;
    
    {
     
      this.isSubmitted = false;
      const formData: FormData = new FormData();

      formData.append('file', this.file);
      formData.append('firstName', form.value.firstName);
      formData.append('lastName', form.value.lastName);
      formData.append('country', form.value.country);
      formData.append('contactNumber', form.value.contactPreNo+form.value.contactNo);
      formData.append('alternateContactNumber', form.value.altContactPreNo+form.value.altContactNo);
      formData.append('address', form.value.address);
      formData.append('workLink', form.value.workLink);
      formData.append('emailId', form.value.email);
      this.httpService.postFileData(environment.apiUrl+Urls.API_ENDPOINT.hiring,formData).subscribe(
        response=>{
          this.isApply = false;
          this.isSubmitted = true;
          this.staticDataService.setSubmittedData({email:response.email, code:response.referenceKey,highlitedtitle:"We're", nothighlitedtitle:"Hiring"});
          this.breadcumDataService.changeData('We are hiring');
          this.router.navigate(['/submitted'])
        },
        error=>{
          this.staticDataService.setSubmittedData({email:form.value.email, code:'',highlitedtitle:"We're", nothighlitedtitle:"Hiring"})
          // this.breadcumDataService.changeData('We are hiring');
          this.errorMsg = error.error.error;
          // this.router.navigate(['/submitted']);
          // this.openDialog()
          if(error.status==200){
            this.isApply = false;
            this.isSubmitted = true;
          }
        }
      )
    }


  }

  openDialog(): void {
    this.dialog.open(ErrorModalComponent, {
      width: '250px',
      data:this.errorMsg
    });
  }

}
