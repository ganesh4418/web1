import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoading: boolean = true;

  showSpinner = false;

  constructor(private loaderService: LoaderService,private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });

    this.init();
  }

  init() {

    this.loaderService.getSpinnerObserver().subscribe((status : any) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }

}
