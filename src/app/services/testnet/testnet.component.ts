import { Component, OnInit } from '@angular/core';
import Neon, { rpc, wallet, api, nep5 } from "@cityofzion/neon-js";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-testnet',
  templateUrl: './testnet.component.html',
  styleUrls: ['./testnet.component.css']
})
export class TestnetComponent implements OnInit {

  constructor() { }

  netmap: any;
  epoch: any;

  ngOnInit() {
  }


  async getNetMap(){

    try {
 
      const rpc_client = new rpc.RPCClient(environment.wallet_rpc);
      const query = Neon.create.query({ id: 0, method: "neofs_netmap", params: [] });
      let rpc_result = await rpc_client.execute(query);
      
      this.netmap = rpc_result.NetMap;

      console.log(rpc_result)

      // Parse result options.

      //let x = "/Location:Europe/Country:RU/City:SaintPetersburg".split('/',);
      //console.log(x)
// let opt of node.Options[0].split('/',); let z = index"> 
      

      /*
      if (rpc_result.result == true){
        this.netmap = rpc_result.gas;
      }
      else {
        this.neofs_balance = 0;
      }
*/
    }

    catch (err) {
      console.log(err);
    }
  }



  async getHealth(){
    try {
 
    
      const rpc_client = new rpc.RPCClient(environment.wallet_rpc);
      const query = Neon.create.query({ id: 0, method: "neofs_health", params: [] });
      let rpc_result = await rpc_client.execute(query);
      /*
      this.await_neofs_result = false;
      
      console.log(rpc_result)

      if (rpc_result.result == true){
        this.neofs_balance = rpc_result.gas;
      }
      else {
        this.neofs_balance = 0;
      }*/

    }

    catch (err) {
      console.log(err);
    }
  }


}
