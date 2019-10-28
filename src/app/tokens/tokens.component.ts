import { Component, OnInit } from '@angular/core';
import Neon, { settings, api, rpc, wallet, tx, u, sc, nep5 } from "@cityofzion/neon-js";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {

  constructor() { }

  await_result_gas: boolean = false;
  await_result_nep: boolean = false;

  wallet_data: any;
  my_gas: any;

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

  apiProvider: any;






  async onClickSubmit(formData) {
    try {
      this.show = false;

      if (this.await_result_gas == true || this.await_result_nep == true){
        this.alert_type = "danger"
        this.header = "ERROR:"
        this.message = "In awaiting of previose request"
        this.show = true;
      }


      var privateNetNeoscan = new api.neoscan.instance("PrivateNet");
      var rec_gas: boolean;

      if (Neon.is.address(formData.u_address) == false) {
        this.alert_type = "danger"
        this.header = "ERROR:"
        this.message = "Incorrect Neo address"
        this.show = true;
      }
      else {
        rec_gas = await this.checkGAS(formData.u_address)
      }


      if (Neon.is.address(formData.u_address) == true && this.await_result_gas == false && this.await_result_nep == false) {


        if (rec_gas == true) { //true
          this.alert_type = "danger"
          this.header = "ERROR:"
          this.message = "You already have GAS in the NeoFS testnet."
          this.show = true;
        }
        else {
          // Transfer Tokens

          // GAS
          const intent = api.makeIntent({ GAS: 50 }, formData.u_address)

          const config = {
            api: this.apiProvider, // The network to perform the action, MainNet or TestNet.
            account: this.wallet_data, // This is the address which the assets come from.
            intents: intent, // This is where you want to send assets to.
            url: environment.neo_rpc,
          };

          this.await_result_gas = true;

          Neon.sendAsset(config)
            .then(config => {
              console.log("\n\n--- Response ---");
              console.log(config.response);
              this.alert_type = "success";
              this.header = "GAS has been successfully transferred";
              this.message = "TX: " + config.response.txid;
              this.show = true;
              this.await_result_gas = false;
            })
            .catch(config => {
              console.log(config);
              this.alert_type = "danger"
              this.header = "ERROR:"
              this.message = config
              this.show = true;
              this.await_result_gas = false;
            });







      // NEP-5 TRANSFER
      
      
      var address = this.wallet_data.address

      const rpcAddr =  environment.neo_rpc;
      const scriptHash = environment.nep5_script_hash;
      const tokenInfo = await nep5.getToken(rpcAddr, scriptHash);
      const balance = await nep5.getTokenBalance(rpcAddr, scriptHash, address);

      console.log(tokenInfo)
      console.log(balance)

      const scBuilder = nep5.abi.transfer(scriptHash, address, formData.u_address, 50);
      const script = scBuilder().str;
      const apiProvider = new api.neoscan.instance("PrivateNet");


      const config_nep = {
        api: apiProvider, // Network
        url:  environment.neo_rpc,
        account: this.wallet_data, // Your Account
        script: script, // The Smart Contract invocation script
        gas: 0, // Optional, system fee.
        fees: 0 // Optional, network fee
      };

      // Neon API

      this.await_result_nep = true;

      Neon.doInvoke(config_nep)
        .then(config_nep => {
          console.log("\n\n--- Response NEP5 TRANSFER---");
          console.log(config_nep.response);

          this.alert_type_sec = "success";
          this.header_sec = "NEP-5 GAS has been successfully transferred";
          this.message_sec = "TX: " + config_nep.response.txid;
          this.show_sec = true;
          this.await_result_nep = false;

        })
        .catch(config_nep => {
          console.log(config_nep);
          this.alert_type_sec = "danger";
          this.header_sec = "ERROR:";
          this.message_sec = config_nep;
          this.show_sec = true;
          this.await_result_nep = false;
        });


        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }


  async checkGAS(address: string) {
    try {
      var rec_gas: any;
      var privateNetNeoscan = new api.neoscan.instance("PrivateNet");
      await privateNetNeoscan.getBalance(address).then(res => { rec_gas = res.assets.GAS.balance.toString(); console.log("++REC ADDR GAS:"); console.log(rec_gas); });

      if (rec_gas > 0) {
        return true;
      }
      else {
        return false;
      }


    }
    catch (err) {
      return false
    }
  }



  ngOnInit() {

    const privateNetConfig = {
      name: "PrivateNet",
      // Need to figure out whether we need protocol configuration with magic number, etc.
      // ProtocolConfiguration: {
      //   Magic: 123,
      //   AddressVersion: 1,
      // },
      nodes: [
        environment.neo_node_1,
        environment.neo_node_2,
        environment.neo_node_3,
        environment.neo_node_4,
      ], // Optional
      extra: {
        // Neoscan URL
        neoscan: environment.neo_scan
      }
    };

    const privateNet = new rpc.Network(privateNetConfig);
    Neon.add.network(privateNet);

    // Get Wallet
    this.wallet_data = this.getWallet()

   

/*
    console.log("1:-------------------------------")
    // http://localhost:4000/api/main_net
    privateNetNeoscan.getBalance(address).then(res => { this.my_gas = res.assets["GAS"].balance.toString(); console.log("MAIN ADDR GAS:"); console.log(this.my_gas) });
    console.log("PK:")
    console.log(this.wallet_data.privateKey) */

    this.apiProvider = new api.neoscan.instance("PrivateNet");


  }

  getWallet() {
    return new wallet.Account("KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr")
  }


}
