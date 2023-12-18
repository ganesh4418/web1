import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { error } from 'console';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(
    private loadingService: LoaderService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loadingService.requestStarted();
    return this.handler(next,request)

    // this.loadingService.show();
    // return next.handle(request).pipe(
    // finalize(() => this.loadingService.hide())
    // );


    // this.totalRequests++;
    // this.loadingService.setLoading(true);
    // return next.handle(request).pipe(
    //   finalize(() => {
    //     this.totalRequests--;
    //     if (this.totalRequests == 0) {
    //       this.loadingService.setLoading(false);
    //     }
    //   })
    // );
  }

  handler(next: any, request: any) {
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.loadingService.requestEnded();
          }
        },
        (error : HttpErrorResponse) =>{
          this.loadingService.resetSpinner();
          throw error
        }
      )
    )
  }
}