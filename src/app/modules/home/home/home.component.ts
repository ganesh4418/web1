import { Component, OnInit } from '@angular/core';
import { CaseStudy } from 'src/app/core/mocks/case-study';
import { about } from 'src/app/core/mocks/about';
import SwiperCore, { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper';
import { StaticDataService } from 'src/app/shared/services/static-data.service';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { NgwWowService } from 'ngx-wow';

SwiperCore.use([EffectCoverflow, Pagination, Navigation, Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ourWorksItems: any;
  brand = [
    {
      pic: "assets/media/images/client-1.png",
      name: "Bharat Forge"
    },
    {
      pic: "assets/media/images/client-2.png",
      name: "Packwell Gaskets"
    },
    {
      pic: "assets/media/images/client-4.png",
      name: "MFS Africa"
    },
    {
      pic: "assets/media/images/client-5.png",
      name: "StyleCracker"
    },
    {
      pic: "assets/media/images/C4i4.png",
      name: "Centre for industry 4.0"
    },
    {
      pic: "assets/media/images/Parallel Dots.png",
      name: "Parallel Dots"
    },
    // {
    //   pic: "assets/media/images/client-6.png",
    //   name: "Caratlane"
    // },
    // {
    //   pic: "assets/media/images/client-7.png",
    //   name: "Druva"
    // },
    // {
    //   pic: "assets/media/images/client-8.png",
    //   name: "Affine"
    // },
    {
      pic: "assets/media/images/client-9.png",
      name: "Geek Solutions"
    },
    {
      pic: "assets/media/images/Spares Pazari.png",
      name: "Spares Pazari"
    }
  ]

  coverflow = [
    {
      msg: "I always get top-quality Salesforce.com and FullStack developers from Beauto Systems . Will highly recommend them to my network and peers with the IT industry.",
      pic: "assets/media/images/user-2.png",
      name: "- Miley Rogers, CEO, VFO Soft"
    },
    {
      msg: "We are very pleased and truly delight with the services of Beauto Systems as they provided verified and experienced bench resources, that  helped us in achieving an extra mile with project.",
      pic: "assets/media/images/Testimonial-1.webp",
      name: "- John Raily, CEO, Prod Studio"
    },
    {
      msg: "This is to certify that Beauto Systems India has been our remarkable technology partner, well equipped and capable of the latest AI/ML/AR/VR solutions and implementations.",
      pic: "assets/media/images/user-3.png",
      name: "- Rajesh Mandak, CEO, Megatronics"
    },
    {
      msg: "This is to certify that Beauto Systems India has been our remarkable technology partner, well equipped and capable of the latest AI/ML/AR/VR solutions and implementations.",
      pic: "assets/media/images/user-3.png",
      name: "- Rajesh Mandak, CEO, Megatronics"
    }
  ]


  client: any = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    breakpoints: {
      1200: {
        effect: 'coverflow',
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 500,
          modifier: 3,
          slideShadows: false
        }
      },
      992: {
        effect: 'coverflow',
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 500,
          modifier: 3,
          slideShadows: false
        }
      },
      768: {
        effect: 'coverflow',
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false
        }
      },
      320: {
        effect: 'coverflow',
        slidesPerView: 1,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false
        }
      }
    }
  }

  swiperConfig: any = {
    slidesPerView: 'auto',
    breakpoints: {
      1200: {
        slidesPerView: 6,
      },
      992: {
        slidesPerView: 5
      },
      768: {
        slidesPerView: 4
      },
      320: {
        slidesPerView: 4
      }
    }
  }

  caseStudyItems: any
  about: { smallTitle: string; title: string; pic: string; desc: string; links: any }[] | undefined;
  title!: string;
  pageName: string = 'All'

  constructor(private staticDataService: StaticDataService, private breadcumDataService: BreadcumDataService ,
     private wowService: NgwWowService) { }

  ngOnInit(): void {
    // this.wowService.init();
     let data_about = new about();
    this.about = data_about.achivement;
    this.title = "Recent Case Studies";
    this.caseStudyItems = this.staticDataService.getCaseStudyData("");
    // case "All":this.caseStudyItems=this.staticDataService.getCaseStudyData('');
    this.breadcumDataService.currentPage(this.pageName);

    this.ourWorksItems = [];
    this.ourWorksItems = this.staticDataService.getOurWorkData('','Products');
  }
}
