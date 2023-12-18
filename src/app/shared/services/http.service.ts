import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private http:HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(url);
  }

  post(url: string, data: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     return this.http.post(url, data,httpOptions);
  }

  postFileData(url: string, data: any): Observable<any> {
    // const formData: FormData = new FormData();

    // formData.append('file', doc);
    // formData.append('firstName', data.firstName);
    // formData.append('lastName', data.lastName);
    // formData.append('country', data.country);
    // formData.append('contactNumber', data.contactPreNo+" "+data.contactNo);
    // formData.append('alterNateContactNumber', data.altContactPreNo+" "+data.altContactNo);
    // formData.append('address', data.address);
    // formData.append('workLink', data.workLink);
    // formData.append('emailId', data.email);
    return this.http.post(url, data);
  }
}
