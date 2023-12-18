import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {filter} from 'rxjs/operators';
import { MenuItem } from 'src/app/core/mocks/menuitem';
import { BreadcumDataService } from '../services/breadcum-data.service';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = {label:'Home', url: ''};
  menuItems!: MenuItem[];
  brudcrumbItem:any;
  subscription!: Subscription;
  currentBreadcum!: string;
  stepColorchange!:string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,private breadcumDataService:BreadcumDataService) {
    this.menuItems=[];
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => { 
      this.menuItems = this.createBreadcrumbs(this.activatedRoute.root); 
      this.menuItems.unshift(this.home);
    });
  }

  ngOnInit(): void {
    this.subscription= this.breadcumDataService.breadcumCurrentData.subscribe(
      cBreadcum=>{
        this.currentBreadcum=cBreadcum;       
      }
    )

    this.breadcumDataService.breadcumClasss.subscribe(res =>{
      this.stepColorchange= res;
    });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = [ ]): any {
    
    const children: ActivatedRoute[] = route.children;   

    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');      
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
 
      if (routeURL === '') {
        return breadcrumbs;
      }
      if (label !== 'undefined' && label !== null ) {
        breadcrumbs.push({label, url});
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

  onBack(a:any){
    if(a.includes('/')){
      this.breadcumDataService.changeBackState(false)
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
