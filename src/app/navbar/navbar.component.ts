import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { TranslateService } from '@ngx-translate/core';

  
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  constructor(public router: Router, public translate: TranslateService) { }

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
    this.translate.use(lang)
    //this.en = "color: rgba(0, 0, 0, 0.8);";
    
  }

}
