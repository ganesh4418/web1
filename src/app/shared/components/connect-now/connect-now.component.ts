import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Urls } from 'src/app/core/mocks/api-endpoints';
import { Prefixes } from 'src/app/core/mocks/prefixes';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../services/http.service';
import { Observable, of } from 'rxjs';
import { StaticDataService } from '../../services/static-data.service';
import { BreadcumDataService } from '../../services/breadcum-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect-now',
  templateUrl: './connect-now.component.html',
  styleUrls: ['./connect-now.component.scss']
})
export class ConnectNowComponent implements OnInit {
  prefixes: any;
  minMobileLength: number = 5;
  maxMobileLength: number = 14;
  mobileNoPrefix: any;
  @Output() close = new EventEmitter();
  exploreMoreForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    country: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    contactPreNo: new FormControl(''),
    contactNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5), Validators.maxLength(14)]),
    email: new FormControl('', [Validators.required, Validators.email,
    Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    msg: new FormControl('', Validators.required),

  });
  constructor(private httpService: HttpService, private staticDataService: StaticDataService, private breadcumDataService: BreadcumDataService, private router: Router) { }

  ngOnInit(): void {
    let prefixes = new Prefixes();
    this.prefixes = prefixes.countriesData;
  }
  get exploreMoreFormControl() {
    return this.exploreMoreForm.controls;
  }

  onSelectChange(event: any) {
    for (let i in this.prefixes) {
      if (this.prefixes[i].name == event.target.value) {
        if (this.prefixes[i].moblie_prefix.length != 0) {
          let mobileNoPrefix = [];
          mobileNoPrefix = this.prefixes[i].moblie_prefix;
          this.minMobileLength = this.prefixes[i].min_mobile_no_size;
          this.maxMobileLength = this.prefixes[i].max_mobile_no_size;
          this.exploreMoreForm.controls['contactNo'].setAsyncValidators([this.mobilePrefixValidator(mobileNoPrefix)]);
          this.exploreMoreForm.controls['contactNo'].setValidators([Validators.required, Validators.minLength(this.prefixes[i].min_mobile_no_size), Validators.maxLength(this.prefixes[i].max_mobile_no_size)]);
          this.exploreMoreForm.get('contactNo')?.updateValueAndValidity();
        }
        this.exploreMoreForm.patchValue({
          contactPreNo: this.prefixes[i].dial_code,
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

  onSubmit(formData: any) {

    console.log(formData.value)
    let date = new Date();
    if (formData.valid) {
      let data = {
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        country: formData.value.country,
        email: formData.value.email,
        contactNumber: formData.value.contactPreNo + formData.value.contactNo,
        briefForTheMeeting: formData.value.msg,
        date: date.toISOString().split('T')[0],
        time: date.toISOString().substring(17, 24),

      }
      this.httpService.post(environment.apiUrl + Urls.API_ENDPOINT.writeUs, data).subscribe(
        response => {
          let data = {
            email: response.email,
            code: response.referenceKey,
            isSuccess: true
          }
          this.staticDataService.setSubmittedData({ email: response.email, code: response.referenceKey, highlitedtitle: "Connect", nothighlitedtitle: "now" })
          this.breadcumDataService.changeData('Connect now');
          this.router.navigate(['/submitted'])
        },
        error => {
          let data = {
            isSuccess: false
          }
        }
      )
    }

  }
  closeClicked() {
    this.close.emit(false)
  }
}
