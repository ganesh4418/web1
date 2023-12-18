import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilteredDataService {

  private dataSource = new BehaviorSubject<any>([]);
  currentData = this.dataSource.asObservable();

  private jobSource = new BehaviorSubject<number>(0);
  currentJob = this.jobSource.asObservable();

  private aboutIndexSource = new BehaviorSubject<number>(0);
  currentAboutIndex= this.aboutIndexSource.asObservable();

  private searchTextSource = new BehaviorSubject<string>('');
  currentSearchText= this.searchTextSource.asObservable();

  constructor() { }

  changeData(data: any) {
    this.dataSource.next(data);
  }
  changeJobData(data: number) {
    this.jobSource.next(data);
  }
  changeAboutIndexData(data: number) {
    this.aboutIndexSource.next(data);
  }

  changeSearchText(data:string){
    this.searchTextSource.next(data);
  }
}
