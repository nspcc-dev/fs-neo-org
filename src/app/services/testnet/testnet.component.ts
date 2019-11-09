import { Component, OnInit } from '@angular/core';
import Neon, { rpc, wallet, api, nep5 } from "@cityofzion/neon-js";
import { environment } from "../../../environments/environment";
var Long = require("long");

@Component({
  selector: 'app-testnet',
  templateUrl: './testnet.component.html',
  styleUrls: ['./testnet.component.css']
})
export class TestnetComponent implements OnInit {

  constructor() { }

  netmap: any;
  epoch: any;
  nodes_state: any[];

  ngOnInit() {
    this.getNetMap()
  }


  isHealthy(val: any) { 

    let ip = val.Address.split("/")[2]
    let port = val.Address.split("/")[4]

    // nodes_state
    for (let state of this.nodes_state) {
        if (state.node == ip+":"+port) {
          if (state.Healthy == true) {
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

      const rpc_client = new rpc.RPCClient(environment.wallet_rpc);
      const query = Neon.create.query({ id: 0, method: "neofs_netmap", params: [] });
      let rpc_result = await rpc_client.execute(query);

      this.netmap = rpc_result.NetMap;
 

      let long_epoch = rpc_result.Epoch;
      this.epoch = new Long(long_epoch.low, long_epoch.high, long_epoch.unsigned).toNumber()
  

      let node_list_state = []

      console.log(rpc_result)

      for (let node_ip_port of this.netmap) {
        var ip = node_ip_port.Address.split("/")[2]
        var port = node_ip_port.Address.split("/")[4]

        node_list_state.push(ip + ":" + port)

      }




      //node_list_state

      let asyncFunctions = [];

      for (let node_addr of node_list_state) {

        let query_hc = Neon.create.query({ id: 0, method: "neofs_health", params: [node_addr] });
        asyncFunctions.push(rpc_client.execute(query_hc));

      }

  
      this.nodes_state = await Promise.all(asyncFunctions);

    }

    catch (err) {
      console.log(err);
    }
  }


 


}
