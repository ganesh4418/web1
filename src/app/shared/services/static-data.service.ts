import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Blogs } from 'src/app/core/mocks/blogs';
import { CaseStudy } from 'src/app/core/mocks/case-study';
import { CountryList } from 'src/app/core/mocks/countries';
import { PhotoGallery } from 'src/app/core/mocks/gallery';
import { OurWorks } from 'src/app/core/mocks/our-works';
import { Resources } from 'src/app/core/mocks/resources';
import { Services } from 'src/app/core/mocks/services';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  ourWorksItems: any;
  blogItems: any;
  caseStudyItems: any;
  allBlogData: any;
  allOurWorkData: any;
  allCaseStudyData: any
  filteredData: any;
  galleryItems: any;
  allTeamData: any;
  servicesData: any;
  private incomingPage = new BehaviorSubject<any>(false);
  allWorkItems: any;
  private selectedTabOnBlog = new Subject<any>();
  servicesdropdown = new Subject();

  preSelectedBlog = new Blogs().blogData[0];
  private selectedBlog = new BehaviorSubject<any>(this.preSelectedBlog);
  private changeBlogTab = new BehaviorSubject<string>("introduction");

  private selectedCaseStude = new BehaviorSubject<any>(new CaseStudy().caseStudyData[0]);
  private submittedDataSource = new BehaviorSubject<any>({});
  submittedCurrentData = this.submittedDataSource.asObservable();

  private categoryServiceDataSource = new BehaviorSubject<string>('');
  categoryServiceCurrentData = this.categoryServiceDataSource.asObservable();
  constructor() {
  }

  getOurWorksData(category: String) {
    let workData = new OurWorks();
    this.ourWorksItems = [];

    for (let i in workData.ourWorksData) {
      if (workData.ourWorksData[i].category == category) {
        this.ourWorksItems.push(workData.ourWorksData[i]);
      }
    }
    return this.ourWorksItems;
  }

  getBlogsData(category: String) {
    let blogsData = new Blogs();
    this.blogItems = [];
    for (let i in blogsData.blogData) {
      if (blogsData.blogData[i].category == category) {
        this.blogItems.push(blogsData.blogData[i]);
      }
    }
    return this.blogItems;
  }

  getServicesData(category: String) {
    let servicesData = new Services();
    this.servicesData = [];
    for (let i in servicesData.services) {
      if (servicesData.services[i].category == category) {
        this.servicesData.push(servicesData.services[i]);
      }
    }
    return this.servicesData;
  }


  getCaseStudyData(category: string) {
    let caseStudyData = new CaseStudy();
    this.caseStudyItems = [];
    if (category == '') {
      this.caseStudyItems = caseStudyData.caseStudyData;
    } else {
      for (let i in caseStudyData.caseStudyData) {
        if (caseStudyData.caseStudyData[i].category == category) {
          this.caseStudyItems.push(caseStudyData.caseStudyData[i]);
        }
      }
    }
    return this.caseStudyItems;
  }

  getGalleryData(category: string) {
    let galleryImages = new PhotoGallery();
    this.galleryItems = [];
    if (category == '') {
      this.galleryItems = galleryImages.galleryData;
    } else {
      for (let i in galleryImages.galleryData) {
        if (galleryImages.galleryData[i].category == category) {
          this.galleryItems.push(galleryImages.galleryData[i]);
        }
      }
    }
    return this.galleryItems;
  }
  getOurWorkData(category: string, type?: string) {
    let allWork = new OurWorks();
    this.allWorkItems = [];
    if (category == '') {
      this.allWorkItems = allWork.ourWorksData.filter(x => x.subcategory === type);
    } else {
      for (let i in allWork.ourWorksData) {
        if (allWork.ourWorksData[i].category == category && allWork.ourWorksData[i].subcategory == type) {
          this.allWorkItems.push(allWork.ourWorksData[i]);
        }
      }
    }
    return this.allWorkItems;
  }

  getProductData(category: string) {
    let allWork = new OurWorks();
    this.allWorkItems = [];
    if (category == '') {
      this.allWorkItems = allWork.ourWorksData;
    } else {
      for (let i in allWork.ourWorksData) {
        if (allWork.ourWorksData[i].subcategory == category) {
          this.allWorkItems.push(allWork.ourWorksData[i]);
        }
      }
    }
    return this.allWorkItems;
  }

  getAllResourcesData(){
    let ResorucesData = new Resources();
    return ResorucesData.ResorucesData;
  }

  setAllTeamData(data: any) {
    this.allTeamData = data;
  }
  getAllTeamData() {
    return this.allTeamData;
  }
  setAllCaseStudyData(data: any) {
    this.allCaseStudyData = data;
  }

  getAllCaseStudyData() {
    return this.allCaseStudyData;
  }

  setAllOurWorkData(data: any) {
    this.allOurWorkData = data;
  }

  getAllOurWorkData() {
    return this.allOurWorkData;
  }

  setAllBlogData(data: any) {
    this.allBlogData = data;
  }

  getAllBlogData() {
    return this.allBlogData;
  }

  setFilteredData(data: any) {
    this.filteredData = data;
  }

  getFilteredData() {
    return this.filteredData;
  }

  setIncomingPage(x: any) {
    this.incomingPage.next(x);
  }
  getIncomingPage() {
    return this.incomingPage.asObservable();
  }

  setFilterTabForBlog(tab: any) {
    this.selectedTabOnBlog.next(tab);
  }

  getFilterTabForBlog() {
    return this.selectedTabOnBlog.asObservable();
  }

  setChangedTab(tab: string) {
    console.log(tab)
    this.changeBlogTab.next(tab);
  }

  getChangedTab() {
    return this.changeBlogTab.asObservable();
  }

  getCountriesList() {
    let countries = new CountryList();
    return countries.countriesData;
  }

  setBlog(blog: any) {
    this.selectedBlog.next(blog);
  }

  getBlog() {
    return this.selectedBlog.asObservable();
  }

  setCaseStude(caseStudy: any) {
    this.selectedCaseStude.next(caseStudy);
  }

  getCaseStude() {
    return this.selectedCaseStude.asObservable();
  }

  setSubmittedData(data: any) {
    this.submittedDataSource.next(data);
  }

  getSubmittedData() {
    return this.submittedDataSource.asObservable();
  }

  setCategoryService(data: any) {
    this.categoryServiceDataSource.next(data);
  }

  getCategoryService() {
    return this.categoryServiceDataSource.asObservable();
  }
}
