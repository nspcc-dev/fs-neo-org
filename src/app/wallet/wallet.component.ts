import { Component, OnInit } from '@angular/core';
import { WalletServService } from '../wallet-serv.service'
import Neon, { rpc, wallet, api, nep5, sc } from "@cityofzion/neon-js";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  constructor(public walletservice: WalletServService, public router: Router) { }
  navbarOpen = false;
  nav = "" // deposit / withdraw
  show = false;
  autohide = true;
  header = ""
  alert_type = ""
  message = "";
  
  spinner_nep5 = true;
  spinner_gas = true;
  spinner_neofs = true;

  ngOnInit() {



    const privateNetConfig = {
      name: "PrivateNet",
      nodes: [
        environment.neo_node_1,
        //environment.neo_node_2,
        //environment.neo_node_3,
        //environment.neo_node_4,
      ], // Optional
      extra: {
        // Neoscan URL
        neoscan: environment.neo_scan
      }
    };


    const privateNet = new rpc.Network(privateNetConfig);
    Neon.add.network(privateNet);

    this.walletservice.getWallet();
    this.nav = "wallet"
    this.WalletBalanceRefresh()
  }

  CloseWallet() {
    this.walletservice.setWallet(undefined)
  }

 

  async DepositWallet(formData) {
   
//    formData.u_dep should be number <= current nep5 balance oe ERR

    //const sb = Neon.create.scriptBuilder();

 

    const props = {
      scriptHash: environment.neofs_sc,
      operation: "Deposit",
      args: [this.walletservice.getWallet().publicKey, Number(formData.u_dep)]
    };

    const vmScript = Neon.create.script(props);
    const script = vmScript; //sb.str;
    let wallet_data = this.walletservice.getWallet();

    const apiProvider = new api.neoscan.instance("PrivateNet");

    const config_nep = {
      api: apiProvider, // Network
      url: environment.neo_rpc,
      account: wallet_data,
      script: script, // The Smart Contract invocation script
      gas: 0, // Optional, system fee.
      fees: 0.0001 // Optional, network fee
    };

    // Neon API
    await Neon.doInvoke(config_nep)
      .then(config_nep => {

        console.log(config_nep)
        console.log(config_nep.response.result)
        console.log(config_nep.response.txid)
        if (config_nep.response.result)
          this.alert_type = "success"
        this.header = "Deposit invocation:"
        this.message = "Tx: " + config_nep.response.txid;
        this.show = true;

      })
      .catch(config_nep => {
        console.log(config_nep)
        this.alert_type = "danger"
        this.header = "ERROR:"
        this.message = "Incorrect contract invocation."
        this.show = true;
      });

  
    await this.WalletBalanceRefresh()
 

  }
/*
  async WalletNeoFSBalanceRefresh() {
    console.log("FS update balance")
    this.spinner_neofs = true;
    await this.walletservice.setNeoFSBalance();
    this.spinner_neofs = false;
  }*/

  async WalletBalanceRefresh() {
    this.spinner_nep5 = true;
    this.spinner_gas = true;
    this.spinner_neofs = true;
    await this.walletservice.setBalance()
    this.spinner_nep5 = false;
    this.spinner_gas = false;
    
    await this.walletservice.setNeoFSBalance();
    this.spinner_neofs = false;
  }

  async OpenWallet(formData) {
    var wallet_gen: any;

    if (!wallet.isPrivateKey(formData.u_wif) && !wallet.isWIF(formData.u_wif)) {
      this.alert_type = "danger"
      this.header = "ERROR:"
      this.message = "Incorrect WIF or Private key"
      this.show = true;
      return false;
    }

    wallet_gen = new wallet.Account(formData.u_wif)

 

    if (wallet_gen.address) {

      this.spinner_nep5 = true;
      this.spinner_gas = true;
      await this.walletservice.setWallet(wallet_gen)
      await this.WalletBalanceRefresh()
      this.nav = "wallet"
      
    }


  }

  async GenerateWallet() {

    const wallet_gen = new wallet.Account()

    console.log(wallet_gen)
    this.spinner_nep5 = true;
    this.spinner_gas = true;
    await this.walletservice.setWallet(wallet_gen)
    this.WalletBalanceRefresh()
    this.nav = "wallet"
  }


  SetNavWallet(nav: string) {
    this.nav = nav;

  }



  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onClick() {
    this.navbarOpen = false;
  }

}
