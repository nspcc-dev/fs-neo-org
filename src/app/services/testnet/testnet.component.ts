import { Component, OnInit } from '@angular/core';
import Neon, { rpc } from "@cityofzion/neon-js";
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
  //rpc_result: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  ngOnInit() {

    console.log("API:")


    this.getNetMap()

    /*
    {"epoch":4,
    "nodes":[
      {"healthy":true,"address":"/ip4/178.128.22.46/tcp/8080","message":"OK"},
      {"healthy":true,"address":"/ip4/178.62.234.54/tcp/8080","message":"OK"},
      {"healthy":true,"address":"/ip4/165.22.29.184/tcp/8080","message":"OK"},
      {"healthy":true,"address":"/ip4/85.143.219.93/tcp/8080","message":"OK"},
      {"healthy":true,"address":"/ip4/157.245.37.172/tcp/8080","message":"OK"},
      {"healthy":true,"address":"/ip4/167.71.226.0/tcp/8080","message":"OK"},
      {"healthy":true,"address":"/ip4/138.197.169.8/tcp/8080","message":"OK"},
      {"healthy":true,"address":"/ip4/67.205.133.241/tcp/8080","message":"OK"}]}
    */
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
 
      this.http.get(`${environment.neofs_api}/healthy`).subscribe(resp => { 
        
        rpc_result = resp; 
        this.netmap = rpc_result.nodes;
        this.epoch = rpc_result.epoch;

        for (var _i = 0; _i < this.netmap.length; _i++) {  
          var ip = this.netmap[_i].address.split("/")[2]
          var port = this.netmap[_i].address.split("/")[4]
          this.netmap[_i].address = ip + ":" + port
        }

      });

/*
      rpc_result = {
        "epoch": 4,
        "nodes": [
          { "healthy": true, "address": "/ip4/178.128.22.46/tcp/8080", "message": "OK" },
          { "healthy": true, "address": "/ip4/178.62.234.54/tcp/8080", "message": "OK" },
          { "healthy": true, "address": "/ip4/165.22.29.184/tcp/8080", "message": "OK" },
          { "healthy": true, "address": "/ip4/85.143.219.93/tcp/8080", "message": "OK" },
          { "healthy": true, "address": "/ip4/157.245.37.172/tcp/8080", "message": "OK" },
          { "healthy": true, "address": "/ip4/167.71.226.0/tcp/8080", "message": "OK" },
          { "healthy": true, "address": "/ip4/138.197.169.8/tcp/8080", "message": "OK" },
          { "healthy": true, "address": "/ip4/67.205.133.241/tcp/8080", "message": "OK" }]
      }
*/


      //node_list_state
      /*
      let asyncFunctions = [];

      for (let node_addr of node_list_state) {

        let query_hc = Neon.create.query({ id: 0, method: "neofs_health", params: [node_addr] });
        asyncFunctions.push(rpc_client.execute(query_hc));

      }

  
      this.nodes_state = await Promise.all(asyncFunctions);

*/

    }

    catch (err) {
      console.log(err);
    }
  }





}
