import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {Router} from "@angular/router";

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
 
  
  //public safeURL: SafeResourceUrl;
  constructor(private router: Router, private _sanitizer: DomSanitizer) { 
  //this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/2o44JvXyy0o');
  }

  ngOnInit() {
    
  }


  scrollToElement($element): void {
    
    $element.scrollIntoView({behavior: "smooth", block: "start"});
    setTimeout(() => {
      window.scrollBy(0, -50);}, 1500);
  }

  routeToFeatures() {
    this.router.navigateByUrl("/features")
  }

  routeToNetwork() {
    this.router.navigateByUrl("/network")
  }

  routeToAudit() {
    this.router.navigateByUrl("/audit")
  }

  routeToGas() {
    this.router.navigateByUrl("/gas")
  }

  
  
}
