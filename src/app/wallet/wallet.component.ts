import { Component, OnInit } from '@angular/core';
import { WalletServService } from '../wallet-serv.service'
import Neon, { rpc, wallet, api, nep5, sc } from "@cityofzion/neon-js";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

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
  nav = "";

  show_awaiting_msg = false;

  show = false;
  autohide = true;
  header = "";
  alert_type = "";
  message = "";


  spinner_nep5 = true;
  spinner_gas = true;
  spinner_neofs = true;

  ngOnInit() { }

  CloseWallet() {
    this.walletservice.setWallet(undefined)
  }


  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async DepositWallet(formData) {

    var regex = /^[0-9\.]+$/;
    if (!formData.u_dep.match(regex)) {
      this.alert_type = "danger"
      this.header = "ERROR:"
      this.message = "Deposit must input numbers."
      this.show = true;
      return false;
    }

    if (!(formData.u_dep > 0)) {
      this.alert_type = "danger"
      this.header = "ERROR:"
      this.message = "Deposit must be greater than zero"
      this.show = true;
      return false;
    }


    let prev_neofs_tokens = this.walletservice.getNeoFSBalance()


    const props = {
      scriptHash: environment.neofs_sc,
      operation: "Deposit",
      args: [this.walletservice.getWallet().publicKey, Number(formData.u_dep)]
    };


    this.spinner_neofs = true;

    this.WalletBalanceGASRefreshChanged()

    let i = 1;
    while (i < 20 && this.walletservice.getNeoFSBalance() == prev_neofs_tokens) {
      await new Promise(resolve => setTimeout(resolve, 500));
      await this.walletservice.setNeoFSBalance();
      i++;
    }

    this.spinner_neofs = false;

  }


  async WalletRequestNeoFS() {
    if (this.walletservice.getNeoFSBalance() == 0) {
      this.show_awaiting_msg = true;

      await this.tokens.onClickSubmitNeoFS(this.walletservice.getWallet().publicKey)

      await this.WalletBalanceFSRefresh()

      this.show_awaiting_msg = false;

      await this.delay(5000);

      this.tokens.show = false;
      this.tokens.show_p = false;
      this.tokens.show_sec = false;
      this.tokens.show_sec_p = false;
    }
  }

  async WalletRequestTokens() {
    if (this.walletservice.getBalance().gas == 0) {

      this.show_awaiting_msg = true;

      await this.tokens.onClickSubmit({ u_address: this.walletservice.getWallet().address })

      await this.WalletBalanceGASRefresh()

      this.show_awaiting_msg = false;

      await this.delay(5000);

      this.tokens.show = false;
      this.tokens.show_p = false;
      this.tokens.show_sec = false;
      this.tokens.show_sec_p = false;

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

    let i = 1;
    while (i < 25 && (await this.walletservice.getBalance().gas == prev_gas || await this.walletservice.getBalance().nep5 == prev_nep)) {
      await new Promise(resolve => setTimeout(resolve, 500));
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
