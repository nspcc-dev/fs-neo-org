import { Component, OnInit } from '@angular/core';
import { WalletServService } from '../wallet-serv.service'
import Neon, { rpc, wallet, api, nep5, sc } from "@cityofzion/neon-js";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment.prod';

import { TokensComponent } from '../tokens/tokens.component';

@Component({
  selector: 'app-wallet',
  providers: [TokensComponent],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  constructor(public walletservice: WalletServService, public router: Router, public tokens: TokensComponent) { }
  navbarOpen = false;
  nav = "" // deposit / withdraw

  show = false;
  autohide = true;
  header = ""
  alert_type = ""
  message = "";

  show_sec = false;
  autohide_sec = true;
  header_sec = ""
  alert_type_sec = ""
  message_sec = "";

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

    //this.walletservice.getWallet();
    this.nav = "wallet"
    if (this.walletservice.getWallet()) {
      this.WalletBalanceRefresh()
    }
  }

  CloseWallet() {
    this.walletservice.setWallet(undefined)
  }



  async DepositWallet(formData) {

    //    formData.u_dep should be number <= current nep5 balance oe ERR

    //const sb = Neon.create.scriptBuilder();

    let prev_neofs_tokens = this.walletservice.getNeoFSBalance()


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



      this.spinner_neofs = true;

      this.WalletBalanceGASRefreshChanged()

      let i = 1;
      while (i < 50 && this.walletservice.getNeoFSBalance() == prev_neofs_tokens) {
        await new Promise(resolve => setTimeout(resolve, 100));
        await this.walletservice.setNeoFSBalance();
        i++;
      }

      console.log(prev_neofs_tokens)
      


      this.spinner_neofs = false;

    //await this.WalletBalanceRefresh()


  }
  /*
    async WalletNeoFSBalanceRefresh() {
      console.log("FS update balance")
      this.spinner_neofs = true;
      await this.walletservice.setNeoFSBalance();
      this.spinner_neofs = false;
    }*/


  async WalletRequestTokens() {
    if (this.walletservice.getBalance().gas == 0) {
      await this.tokens.onClickSubmit({ u_address: this.walletservice.getWallet().address })

      this.show = this.tokens.show
      this.header = this.tokens.header
      this.alert_type = this.tokens.alert_type
      this.message = this.tokens.message

      this.show_sec = this.tokens.show_sec
      this.header_sec = this.tokens.header_sec
      this.alert_type_sec = this.tokens.alert_type_sec
      this.message_sec = this.tokens.message_sec



      this.spinner_nep5 = true;
      this.spinner_gas = true;



      let i = 1;
      while (i < 100 && (await this.walletservice.getBalance().gas == 0 || await this.walletservice.getBalance().nep5 == 0)) {
        await new Promise(resolve => setTimeout(resolve, 100));
        await this.walletservice.setBalance()
        i++;
      }


      this.spinner_nep5 = false;
      this.spinner_gas = false;
    }

  }

  async WalletBalanceGASRefresh() {
    this.spinner_nep5 = true;
    this.spinner_gas = true;
    await this.walletservice.setBalance()
    
    this.spinner_nep5 = false;
    this.spinner_gas = false;
  }

  async WalletBalanceGASRefreshChanged() {
    this.spinner_nep5 = true;
    this.spinner_gas = true;

    let prev_balance = await this.walletservice.getBalance()
    let prev_gas = prev_balance.gas
    let prev_nep = prev_balance.nep5

    //await this.walletservice.setBalance()

    let i = 1;
    while (i < 100 && (await this.walletservice.getBalance().gas == prev_gas || await this.walletservice.getBalance().nep5 == prev_nep)) {
      await new Promise(resolve => setTimeout(resolve, 100));
      await this.walletservice.setBalance()
      i++;
    }


    this.spinner_nep5 = false;
    this.spinner_gas = false;
  }

  async WalletBalanceFSRefresh() {
    this.spinner_neofs = true;
    await this.walletservice.setNeoFSBalance();
    this.spinner_neofs = false;
  }

  async WalletBalanceRefresh() {
    this.WalletBalanceGASRefresh()
    this.WalletBalanceFSRefresh()
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
