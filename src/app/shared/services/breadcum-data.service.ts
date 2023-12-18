import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcumDataService {


  private breadcumDataSource = new BehaviorSubject<string>('');
  private breadcumclasss = new BehaviorSubject<string>('');
  private currentPageSelected = new BehaviorSubject<string>('');
  private backSource = new BehaviorSubject<boolean>(false);
  breadcumCurrentData = this.breadcumDataSource.asObservable();
  breadcumClasss = this.breadcumclasss.asObservable();
  currentPageSelect = this.currentPageSelected.asObservable();
  backState = this.backSource.asObservable();
  
  constructor() { }

  changeData(data: any) {    
    this.breadcumDataSource.next(data);
  }
  setclass(classname:any){
    this.breadcumclasss.next(classname);
  }
  currentPage(data:string){
    this.currentPageSelected.next(data);
  }
  changeBackState(data:boolean){
    this.backSource.next(data);
  }
}
