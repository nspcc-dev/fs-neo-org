import { Injectable } from '@angular/core';
import Neon, { rpc, wallet, api, nep5 } from "@cityofzion/neon-js";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WalletServService {

  constructor() { }

  wallet_balance: { gas: 0, nep5: 0 }
  neofs_balance: any = 0;
  await_gas_result: boolean = false;
  await_neofs_result: boolean = false;

  wallet: any

  public getWallet(): any {
    return this.wallet
  }

  public setWallet(state: any): any {
    this.wallet = state;

  }


  public getNeoFSBalance(): any {
    return this.neofs_balance;
  }

  public getBalance(): any {
    return this.wallet_balance;
  }


  public getBalanceAwait(): any {
    return this.await_gas_result
  }

  public getNeoFSBalanceAwait(): any {
    return this.await_neofs_result
  }

  public async setNeoFSBalance() {
    try {

      this.await_neofs_result = true;
    
      const rpc_client = new rpc.RPCClient(environment.wallet_rpc);
      const query = Neon.create.query({ id: 0, method: "neofs_balance", params: [this.wallet.address] });
      let rpc_result = await rpc_client.execute(query);
      
      this.await_neofs_result = false;
      
      console.log(rpc_result)

      if (rpc_result.result == true){
        this.neofs_balance = rpc_result.gas;
      }
      else {
        this.neofs_balance = 0;
      }
      
      
      /*
      GAS_count = ((balance||{}).value)||0;
      {
  "result": true,
  "err": "",
  "gas": 10
}

      {
  "nodes": [
    {
      "node": "157.245.37.172:8080",
      "status": {
        "Healthy": true,
        "Status": "OK"
      }
    },
    {
      "node": "85.143.219.93:8080",
      "status": {
        "Healthy": true,
        "Status": "OK"
      }
    }
  ]
}*/

    }

    catch (err) {
      console.log(err);
    }
  }


  public async setBalance() {
    try {

      let Nep5_GAS_count;
      let GAS_count;
      

      if (Neon.is.address(this.wallet.address) == false) {
        console.log("Incorrect Neo address")
        return false
      }

      else {

        this.await_gas_result = true;
        const rpcAddr = environment.neo_rpc;
        const scriptHash = environment.nep5_script_hash;
        const balance = await nep5.getTokenBalance(rpcAddr, scriptHash, this.wallet.address);

        Nep5_GAS_count = balance.toString();

        const rpc_client = new rpc.RPCClient(rpcAddr);
        const query = Neon.create.query({ id: 0, method: "getaccountstate", params: [this.wallet.address] });
        let rpc_result = await rpc_client.execute(query);

        for (let balance of rpc_result.result.balances) {
          if (balance.asset == environment.gas_asset) {
            GAS_count = balance.value;
            //GAS_count = ((balance||{}).value)||0;
          }
        }

        if (GAS_count === undefined) {
          GAS_count = 0;
        }

        this.wallet_balance = { gas: GAS_count, nep5: Nep5_GAS_count }
        this.await_gas_result = false;
        return true;
      }


    }
    catch (err) {
      console.log(err);
    }
  }



}
