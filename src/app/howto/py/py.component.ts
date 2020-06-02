import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-py',
  templateUrl: './py.component.html',
  styleUrls: ['./py.component.css']
})
export class PyComponent implements OnInit {

  constructor() { }

  neofs_sc = environment.neofs_sc;

  ngOnInit() {
  }

}
