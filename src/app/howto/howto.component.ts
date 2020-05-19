import { Component, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-howto',
  templateUrl: './howto.component.html',
  styleUrls: ['./howto.component.css']
})
export class HowtoComponent implements OnInit {

  constructor() { }

  neofs_send_url = environment.neofs_send_url;

  ngOnInit() {
  }

}
