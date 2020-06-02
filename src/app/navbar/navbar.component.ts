import { Component, OnInit, Inject } from '@angular/core';
import {Router} from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';

  
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  constructor(public router: Router, public translate: TranslateService, @Inject(DOCUMENT) private document: Document) { }

  en = "color: rgba(0, 229, 153, 0.8);";
  ngOnInit() {
    
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
}

  onClick(){
    this.navbarOpen = false;
  }

  setLang(lang: string){
    this.translate.use(lang);
    if (lang == 'ru'){
      this.document.body.style.fontFamily = "Rajdhani,sans-serif";     
    }
    if (lang == 'zh'){
      this.document.body.style.fontFamily = "Rajdhani,sans-serif";    
    }
    else {
      this.document.body.style.fontFamily = "Rajdhani,sans-serif";    
    }
     
    //  font-family: 'Rajdhani', sans-serif;
    //this.en = "color: rgba(0, 0, 0, 0.8);";
    
  }

}
