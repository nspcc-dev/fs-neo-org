import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  public safeURL: any;
  public safeURL_v2: any;
  constructor( private _sanitizer: DomSanitizer) { 
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/2o44JvXyy0o');
    this.safeURL_v2 = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/4f_q5mVsiXY');
    }

  ngOnInit() {
  }

}
