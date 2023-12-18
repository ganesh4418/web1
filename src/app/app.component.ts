import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { filter } from 'rxjs/operators';
import { NgcCookieConsentService, NgcInitializationErrorEvent, NgcInitializingEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
// declare const cookieconsent: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'beauto-website';

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object, private wowService: NgwWowService, private cookieConsentService: NgcCookieConsentService, private cookieService: CookieService) {

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (isPlatformBrowser(this.platformId)) {
        window.scroll(0, 0);
        this.wowService.init(); // Load WoW animations when done navigating to page
      }
    });
  }

  ngOnInit() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.cookieConsentService.popupOpen$.subscribe(
      () => {
        // you can use this.cookieConsentService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.cookieConsentService.popupClose$.subscribe(
      () => {
        // you can use this.cookieConsentService.getConfig() to do stuff...
      });

    this.initializingSubscription = this.cookieConsentService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
        console.log(`initializing: ${JSON.stringify(event)}`);
      });

    this.initializedSubscription = this.cookieConsentService.initialized$.subscribe(
      () => {
        // the cookieconsent has been successfully initialized.
        // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
        console.log(`initialized: ${JSON.stringify(event)}`);
      });

    this.initializationErrorSubscription = this.cookieConsentService.initializationError$.subscribe(
      (event: NgcInitializationErrorEvent) => {
        // the cookieconsent has failed to initialize... 
        console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
      });

    // you can use this.cookieConsentService.getConfig() to do stuff...
    // this is calling when allow or decline cookie button is clicked.
    this.statusChangeSubscription = this.cookieConsentService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        if (event.status == "allow")
          this.cookieService.set('Test', 'Hello World');
        else
          this.cookieService.delete('Test');
      });

    this.revokeChoiceSubscription = this.cookieConsentService.revokeChoice$.subscribe(
      () => {
        // you can use this.cookieConsentService.getConfig() to do stuff...
      });

    this.noCookieLawSubscription = this.cookieConsentService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.cookieConsentService.getConfig() to do stuff...
      });
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
}

