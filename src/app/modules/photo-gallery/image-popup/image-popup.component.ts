import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";
import { Subscription } from 'rxjs';

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.scss']
})
export class ImagePopupComponent implements OnInit {
  imgUrl:string=this.data.currentImageInfo.pic;
  currentImageInfo: any;
  allImageInfo: any;
  imageChange: boolean = false;
  navButton:boolean=false;
  previewNo:number=0;
  isLoop:boolean=false;
  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;
  constructor(public dialogRef: MatDialogRef<ImagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }



  ngOnInit(): void {
    console.log(this.data)
    this.currentImageInfo = this.data.currentImageInfo;
    this.allImageInfo = this.data.allImageInfo;
    if(this.currentImageInfo.allPics.length>=4){
      this.navButton=true;
      this.previewNo=4;
      this.isLoop=true;
    }else{
      this.previewNo=this.currentImageInfo.allPics.length;
      this.isLoop=false;
    }
    
  }

  onSlideChange(index: number) {
    this.imgUrl=this.allImageInfo[index];
  }

  close(){
    this.dialogRef.close();
  }

  slideNext() {

    if(this.swiper.swiperRef.realIndex==3)
    this.imgUrl=this.allImageInfo[0];
    else
    this.imgUrl=this.allImageInfo[this.swiper.swiperRef.realIndex+1];
    this.swiper.swiperRef.slideNext(100);
  }
  slidePrev() {
    if(this.swiper.swiperRef.realIndex==0)
    this.imgUrl=this.allImageInfo[3];
    else
    this.imgUrl=this.allImageInfo[this.swiper.swiperRef.realIndex-1];
    this.swiper.swiperRef.slidePrev(100);
  }

}
