import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { CaseStudy } from 'src/app/core/mocks/case-study';
import { about } from 'src/app/core/mocks/about';
import SwiperCore, { EffectCoverflow, Pagination, Navigation, Virtual } from 'swiper';
import { BreadcumDataService } from 'src/app/shared/services/breadcum-data.service';
import { StaticDataService } from 'src/app/shared/services/static-data.service';
import { Subscription } from 'rxjs';
import { FilteredDataService } from 'src/app/shared/services/filtered-data.service';
import { SwiperComponent } from 'swiper/angular';
SwiperCore.use([EffectCoverflow, Pagination, Navigation, Virtual]);

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnChanges {

  certificate = [
    "assets/media/images/about/Certification.webp",
    "assets/media/images/about/ISO_9001.webp",
    "assets/media/images/about/ISO_27001.webp"
  ]


  
  stones = [
    {
      pic: "assets/media/images/about/6-anniversary.jpg",
      year: "2023 Successful 6th Anniversary celebration and SWING entered into the market.",
      desc: "Successfully celebrated 6th anniversary and expanding our horizons into the global world.Launched first industrial AGV - 'SWING' into market. Swing revolutionizes industrial automation by seamlessly integrating advanced robotics with intelligent navigation systems.Swing effortlessly transports goods and materials within various industries."
    },
    {
      pic: "assets/media/images/about/5-anniversary.webp",
      year: "2022 Successful 5th Anniversary celebration",
      desc: "Successfully completed 5th year of business operations, happy to share that Beauto has ventured into new territories with inception of new technologies. African Tech Festival (Cape Town 2022) - We received an overwhelmingly positive response. "
    },
    {
      pic: "assets/media/images/about/grown.png",
      year: "2021 Grown The Digital Product Design Team",
      desc: "With prominent focus on growing the digital product design team, we started with campus drive acquiring bright talent and increased the team size from 50 to 100 in the software division. And we proudly innagurated the foundation building of our new Pune office. Overall company strength reached 150+ enabling us attracting clients globally. "
    },
    {
      pic: "assets/media/images/about/extension.png",
      year: "2020 Extension of Beauto",
      desc: "We joined hands with another co-founder & spawned a new company 'Quro Labs', which works as an extension to Beauto's electrical & electronics capabilities. We designed & developed products to fight the pandemic. We worked relentlessly to get quality products out into the market. "
    },
    {
      pic: "assets/media/images/about/new-launches.png",
      year: "2019 Standardizing and many new launches",
      desc: "Built our first mechanical workshop, procured several machines to support our physical product design capabilities. Our digital product design team started shaping up on the software front, & the development team grew from 30 to 45 by the end of 2019. Our software development capabilities got standardized."
    },
    {
      pic: "assets/media/images/about/foundation-team.png",
      year: "2018 Foundation Team",
      desc: "We established our base at Narhe, Pune & started building our digital & physical products development capability. Our strength rose from 5 to 30, & we started experiencing business inflow globally. "
    },
    {
      pic: "assets/media/images/about/founded-2017.png",
      year: "2017 Founded",
      desc: "Beauto Systems Pvt. Ltd was registered on 14th September 2017. We initiated with two members in september & grew to 5 member team by December 2017. First Project - Software development for an automated machine."
    }

  ]

  caseStudyItems: any
  about: { smallTitle: string; title: string; pic: string; desc: string; links:any}[] | undefined;
  title!: string;
  continue = false;
  activeIndex: any;
  aIndex: any;
  disableNext: boolean = false;
  disablePrev: boolean = true;
  subscription!: Subscription;
  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;
  isCertificationCard: any;
  ourWorksItems: any;
  constructor(private breadcumDataService: BreadcumDataService, private staticDataService: StaticDataService, private filteredDataService: FilteredDataService) {
    this.subscription = this.filteredDataService.currentAboutIndex.subscribe(
      cIndex => {
        this.activeIndex = cIndex;
        this.aIndex = this.activeIndex
        console.log(this.activeIndex);
      }
    )
  }

  ngOnChanges() {
    this.subscription = this.filteredDataService.currentAboutIndex.subscribe(
      cIndex => {
        this.activeIndex = cIndex;
        console.log(this.activeIndex);
      }
    )
  }

  ngOnInit(): void {

    this.title = "Our Products";

    this.breadcumDataService.changeData('');
    let data_about = new about();
    this.about = data_about.about;

    let data = new CaseStudy();
    this.caseStudyItems = [];
    this.caseStudyItems = this.staticDataService.getCaseStudyData("");
    this.ourWorksItems = [];
    this.ourWorksItems = this.staticDataService.getOurWorkData('','Products');
    
    this.breadcumDataService.setclass('');
    this.staticDataService.getIncomingPage().subscribe(page => {
      if (page) {
        window.scrollTo(0, 1900);
      }
    });


    // for (let i in data.caseStudyData) {
    //   if (data.caseStudyData[i].category == "about") {
    //     this.caseStudyItems.push(data.caseStudyData[i]);
    //   }
    // }
    // this.subscription= this.filteredDataService.currentAboutIndex.subscribe(
    //   cIndex=>{
    //     this.activeIndex=cIndex;
    //   }
    // )
  }

  viewAll() {
    this.continue = !this.continue;
    if (!this.continue) {
      window.scrollTo(0, 1100);
    }
  }


  slideNext() {
    this.swiper.swiperRef.slideNext(100);
    this.filteredDataService.changeAboutIndexData(this.swiper.swiperRef.activeIndex)
    if (this.swiper.swiperRef.isEnd) {
      this.disableNext = true;
    }
    if (this.swiper.swiperRef.activeIndex > 0) {
      this.disablePrev = false;
    }
    if (this.swiper.swiperRef.activeIndex == 3) {
      this.continue = true;
    }

  }
  slidePrev() {


    console.log(this.activeIndex);

    this.swiper.swiperRef.slidePrev(100);
    this.filteredDataService.changeAboutIndexData(this.swiper.swiperRef.activeIndex)
    if (this.swiper.swiperRef.isBeginning) {
      this.disableNext = false;
      this.disablePrev = true;
    }
    if (!this.swiper.swiperRef.isEnd) {
      this.disableNext = false;
    }
  }
}
