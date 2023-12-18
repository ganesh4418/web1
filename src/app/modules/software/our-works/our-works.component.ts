import { Component, OnInit } from '@angular/core';
import { OurWorks } from 'src/app/core/mocks/our-works';

@Component({
  selector: 'app-our-works',
  templateUrl: './our-works.component.html',
  styleUrls: ['./our-works.component.scss']
})
export class OurWorksComponent implements OnInit {
  ourWorksItems:any;
 
  constructor() { }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    let data=new OurWorks();
    this.ourWorksItems=[];
    for(let i in data.ourWorksData){
      if(data.ourWorksData[i].category=="Software"){
        this.ourWorksItems.push(data.ourWorksData[i]);
      }
    }    
  }

}
