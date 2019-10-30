import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sdk',
  templateUrl: './sdk.component.html',
  styleUrls: ['./sdk.component.css']
})
export class SdkComponent implements OnInit {
  public safeURL: any;
  public safeURL_v2: any;

  constructor(private _sanitizer: DomSanitizer) {
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/2o44JvXyy0o');
    this.safeURL_v2 = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/4f_q5mVsiXY');
   }

  ngOnInit() {
  }

}
