import { Injectable } from '@angular/core';
import Neon, { rpc, wallet, api, nep5 } from "@cityofzion/neon-js";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WalletServService {

  constructor() { }

  wallet_balance: {gas:0, nep5:0}
  wallet: any

  public getWallet(): any {
    return this.wallet
  }

  public setWallet(state: any): any {
    this.wallet = state;

  }


  public getBalance(): any {
    return this.wallet_balance;
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
              }
          }

          if (GAS_count === undefined) {
            GAS_count = 0;
          }
 
          this.wallet_balance = {gas: GAS_count, nep5: Nep5_GAS_count}

          return true;
      }


  }
  catch (err) {
      console.log(err);
  }
}

 

}
