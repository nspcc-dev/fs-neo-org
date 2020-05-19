import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
 
@Component({
  selector: 'app-testnet',
  templateUrl: './testnet.component.html',
  styleUrls: ['./testnet.component.css']
})
export class TestnetComponent implements OnInit {

  constructor(private http: HttpClient) { }

  netmap: any;
  epoch: any;
  nodes_state: any[];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  ngOnInit() {
    this.getNetMap()
  }


  isHealthy(val: any) {
 

    // nodes_state
    for (let state of this.netmap) {
      if (state.address == val.address) {
        if (state.healthy == true) {
          return true;
        }
      }
    }

    return false;
  }

  isNotDef(val: any) { return typeof (val) == 'undefined' }

  async getNetMap() {

    try {

      this.nodes_state = undefined;
      this.epoch = undefined;
      this.netmap = undefined;
      
      let rpc_result = undefined;

       this.http.get(`${environment.neofs_api}/status/storage/`).subscribe(resp => { 
        
        rpc_result = resp; 
        this.netmap = rpc_result.nodes;
        this.epoch = rpc_result.epoch;

        for (var _i = 0; _i < this.netmap.length; _i++) {  
          var ip = this.netmap[_i].address.split("/")[2]
          var port = this.netmap[_i].address.split("/")[4]
          this.netmap[_i].address = ip + ":" + port
        }

      });


    }

    catch (err) {
      console.log(err);
    }
  }





}
