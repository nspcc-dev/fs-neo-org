import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  public safeURL: any;
  public safeURL_consensus: any;
  public safeURL_ep1: any;
  public safeURL_ep2: any;
  public safeURL_ep3: any;
  public safeURL_ep4: any;

  constructor( private _sanitizer: DomSanitizer) { 
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/2o44JvXyy0o');
    this.safeURL_consensus = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/YRm77r_6sw0');
    this.safeURL_ep1 = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/0NDF3QqHpjk');
    this.safeURL_ep2 = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/N5lljo-IvgI');
    this.safeURL_ep3 = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/hZlLP1rgA5Y');
    this.safeURL_ep4 = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/yRecLfRAehM');

    
    }


  ngOnInit() {
  }

}
