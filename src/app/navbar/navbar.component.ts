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

  ngOnInit() {
    
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
}

  onClick(){
    this.navbarOpen = false;
  }
}
