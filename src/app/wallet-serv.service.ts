import { Injectable } from '@angular/core';
import Neon, { rpc, wallet, api, nep5 } from "@cityofzion/neon-js";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WalletServService {

  constructor(private http: HttpClient) { }

  wallet_balance: { gas: 0, nep5: 0 }
  neofs_balance: any = 0;
  await_gas_result: boolean = false;
  await_neofs_result: boolean = false;

  wallet: any

  public getWallet(): any {
    return this.wallet;
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
      let rpc_result;

      let promise = this.http.get(`${environment.neofs_api}/balance/neofs/${this.wallet.publicKey}/`).toPromise();

      await promise.then((data) => {
        this.neofs_balance = JSON.stringify(data).replace(/"/g, "");
        this.neofs_balance = parseFloat(parseFloat(this.neofs_balance).toFixed(3));
      }).catch((error) => {
        this.neofs_balance = 0;
        this.neofs_balance = parseFloat(this.neofs_balance.toFixed(3));
        console.log("Error on attempt to get NeoFS balance: " + error.error);
      });

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
        let promise_gas = this.http.get(`${environment.neofs_api}/balance/gas/${this.wallet.address}/`).toPromise();

        await promise_gas.then((data) => {
          GAS_count = JSON.stringify(data).replace(/"/g, "");
          GAS_count = parseFloat(parseFloat(GAS_count).toFixed(3));
        }).catch((error) => {
          GAS_count = 0;
          console.log("Error on attempt to get GAS: " + error.error)
        });


        let promise_nep = this.http.get(`${environment.neofs_api}/balance/gas3/${this.wallet.address}/`).toPromise();

        await promise_nep.then((data) => {
          Nep5_GAS_count = JSON.stringify(data).replace(/"/g, "");  
          Nep5_GAS_count = parseFloat(parseFloat(Nep5_GAS_count).toFixed(3));
        }).catch((error) => {
          Nep5_GAS_count = 0;
          console.log("Error on attempt to get NEP5 GAS: " + error.error);
        });

        this.wallet_balance = { gas: GAS_count, nep5: Nep5_GAS_count }

      }
    }
    catch (err) {
      console.log(err);
    }
  }



}
