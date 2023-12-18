import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Urls } from 'src/app/core/mocks/api-endpoints';
import { Prefixes } from 'src/app/core/mocks/prefixes';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submitidea',
  templateUrl: './submitidea.component.html',
  styleUrls: ['./submitidea.component.scss']
})
export class SubmitideaComponent implements OnInit {
  prefixes: any;
  countriesList: any;
  youAreDropdown: any = ['Organisation', 'Studio', 'Student', 'Freelancer', 'Other'];
  domain: any = ['Design', 'Software', 'Mechanical', 'Electronics', 'Others'];
  idea: any = ['Idea Sharing', 'Designed And Engineered', 'Prototyped', 'Manufactured With Inventory', 'Already Selling'];
  highlitedtitle: string = "Submit";
  nothighlitedtitle: string = "Your Idea";
  isSubmitted: boolean = false;
  fileName: string = '';
  file!: File;
  yorAre: string = '';
  minMobileLength: number = 5;
  maxMobileLength: number = 14;
  mobileNoPrefix: any;
  submitIdeaForm = new FormGroup({
    fullName        : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    youAre          : new FormControl('', Validators.required),
    youAreName      : new FormControl(''),
    country         : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    contactPreNo    : new FormControl(''),
    contactNo       : new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5), Validators.maxLength(14)]),
    altContactPreNo : new FormControl(''),
    altContactNo    : new FormControl('', [Validators.pattern('^[0-9]*$'), Validators.minLength(5), Validators.maxLength(14)]),
    email           : new FormControl('', [Validators.required, Validators.email,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    subject         : new FormControl('', Validators.required),
    domain          : new FormControl('', Validators.required),
    ideaStage       : new FormControl('', Validators.required),
    ideaDescription : new FormControl('')
  });
  error: boolean = false;

  constructor(private staticDataService: StaticDataService, private httpService: HttpService, private router: Router, private breadcumDataService: BreadcumDataService) {
    let prefixes = new Prefixes();
    this.prefixes = prefixes.countriesData;
  }

  ngOnInit(): void {
    this.breadcumDataService.changeData('');
    this.countriesList = this.staticDataService.getCountriesList();
  }

  get submitIdeaFormControl() {
    return this.submitIdeaForm.controls;
  }

  onSelectYouAre(event: any) {
    console.log(event.target.value)
    this.yorAre = event.target.value;
  }

  onSelectChange(event: any) {
    for (let i in this.prefixes) {
      if (this.prefixes[i].name == event.target.value) {
        if (this.prefixes[i].moblie_prefix.length != 0) {
          let mobileNoPrefix = [];
          mobileNoPrefix = this.prefixes[i].moblie_prefix;
          this.minMobileLength = this.prefixes[i].min_mobile_no_size;
          this.maxMobileLength = this.prefixes[i].max_mobile_no_size;
          this.submitIdeaForm.controls['contactNo'].setAsyncValidators([this.mobilePrefixValidator(mobileNoPrefix)]);
          this.submitIdeaForm.controls['contactNo'].setValidators([Validators.required, Validators.minLength(this.prefixes[i].min_mobile_no_size), Validators.maxLength(this.prefixes[i].max_mobile_no_size)]);
          this.submitIdeaForm.get('contactNo')?.updateValueAndValidity();
          this.submitIdeaForm.controls['altContactNo'].setAsyncValidators([this.mobilePrefixValidator(mobileNoPrefix)]);
          this.submitIdeaForm.controls['altContactNo'].setValidators([Validators.required, Validators.minLength(this.prefixes[i].min_mobile_no_size), Validators.maxLength(this.prefixes[i].max_mobile_no_size)]);
          this.submitIdeaForm.get('altContactNo')?.updateValueAndValidity();
        }
        this.submitIdeaForm.patchValue({
          contactPreNo: this.prefixes[i].dial_code,
          altContactPreNo: this.prefixes[i].dial_code
        });
      }
    }
  }

  mobilePrefixValidator(mNumber: any): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> | Observable<null> => {
      let bReturn: boolean = false;
      for (let i in mNumber) {
        if (!control.value.startsWith(mNumber[i])) {
          bReturn = true;
        } else {
          bReturn = false;
          break;
        }
      }
      console.log(bReturn)
      let err: ValidationErrors = { prefixValid: true };
      return bReturn ? of(err) : of(null);
    }
  }

  readFile(fileEvent: any) {
    const file = fileEvent.target.files[0];
    let fileSize = ((file.size) / 1048576);

    if ((fileSize < 5) && (file.type == 'application/pdf' || file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type == 'application/msword')) {
      console.log('size', file.size);
      console.log('in', file.type);
      this.fileName = file.name;
      this.file = file;
    } else {
      this.fileName = '';
      this.error = true;
    }

  }


  onSubmit(form: any) {
    console.log(form.value)
    this.isSubmitted = true;
    if (form.value.youAreName == '') {
      form.value.youAreName = 'not entered'
    }
    {
      console.log(form.valid)
      this.isSubmitted = false;
      const formData: FormData = new FormData();

      formData.append('attachmentUpload', this.file);
      formData.append('fullName', form.value.fullName);
      formData.append('country', form.value.country);
      formData.append('contactNumber', form.value.contactPreNo + form.value.contactNo);
      formData.append('alternateContactNumber', form.value.altContactPreNo + form.value.altContactNo);
      formData.append('subject', form.value.subject);
      formData.append('domain', form.value.domain);
      formData.append('ideaStage', form.value.ideaStage);
      formData.append('emailAddress', form.value.email);
      formData.append('describeYourIdea', form.value.ideaDescription);
      formData.append('organisationName', form.value.youAreName);
      this.httpService.postFileData(environment.apiUrl + Urls.API_ENDPOINT.submitYourIdea, formData).subscribe(
        response => {
          console.log(response);
          this.isSubmitted = true;
          this.staticDataService.setSubmittedData({ email: response.email, code: response.referenceKey, highlitedtitle: "Submit", nothighlitedtitle: "Your Idea" });
          this.breadcumDataService.changeData('Submit Idea');
          this.router.navigate(['/submitted'])
        },
        error => {
          console.log(error);
          this.staticDataService.setSubmittedData({ email: form.value.email, code: '', highlitedtitle: "We're", nothighlitedtitle: "Hiring" })
          this.breadcumDataService.changeData('Submit Idea');
          this.router.navigate(['/submitted'])
          if (error.status == 200) {
            this.isSubmitted = true;
          }
        }
      )
    }
  }

}
