import { Component, OnInit } from '@angular/core';
import Neon, { rpc } from "@cityofzion/neon-js";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
 

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {

  constructor(public router: Router) { }

  await_result_gas: boolean = false;
 
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


  async onClickCheck(formData) {
    try {
      this.show = false;
      this.show_sec = false;

      if (Neon.is.address(formData.u_address) == false) {
        this.alert_type = "danger"
        this.header = "ERROR:"
        this.message = "Incorrect Neo address"
        this.show = true;
      }
      else {

        const rpc_client = new rpc.RPCClient(environment.wallet_rpc);
        const query = Neon.create.query({ id: 0, method: "balance", params: [formData.u_address] });
        let rpc_result = await rpc_client.execute(query);
 
        if (rpc_result["result"] == true) {
          this.alert_type = "success";
          this.header = "GAS Balance:";
          this.message = rpc_result["data"].gas;

          this.show = true;

          this.alert_type_sec = "success";
          this.header_sec = "NEP-5 GAS Balance:";
          this.message_sec = rpc_result["data"].nep5_gas;
          this.show_sec = true;
        }
        else {
          this.alert_type = "danger";
          this.header = "ERROR:";
          this.message = rpc_result["err"];
          this.show = true;
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  async onClickSubmit(formData) {
    try {

      this.show = false;
      this.show_sec = false;

      if (this.await_result_gas == true) {
        this.alert_type = "danger"
        this.header = "ERROR:"
        this.message = "In awaiting of previose request"
        this.show = true;
      }

      if (Neon.is.address(formData.u_address) == false) {
        this.alert_type = "danger"
        this.header = "ERROR:"
        this.message = "Incorrect Neo address"
        this.show = true;
      }
      else {
        this.await_result_gas = true;
        const rpc_client = new rpc.RPCClient(environment.wallet_rpc);
        const query = Neon.create.query({ id: 0, method: "gettokens", params: [formData.u_address] });
        let rpc_result = await rpc_client.execute(query);
        this.await_result_gas = false;

        if (rpc_result.result == false) {
          this.alert_type = "danger"
          this.header = "ERROR:"
          this.message = rpc_result.err
          this.show = true;
        }
        else {

          if (rpc_result.gas.result == false) {
            this.alert_type = "danger"
            this.header = "ERROR:"
            this.message = rpc_result.gas.err
            this.show = true;

          }
          else {
            this.alert_type = "success";
            this.header = "GAS has been successfully transferred";
            this.message = "TX: " + rpc_result.gas.tx;
            this.show = true;
          }

          if (rpc_result.nep5.result == false) {
            this.alert_type_sec = "danger"
            this.header_sec = "ERROR:"
            this.message_sec = rpc_result.nep5.err
            this.show_sec = true;

          }
          else {
            this.alert_type_sec = "success";
            this.header_sec = "NEP-5 GAS has been successfully transferred";
            this.message_sec = "TX: " + rpc_result.nep5.tx;
            this.show_sec = true;
          }

        }


      }
    }
    catch (err) {
      console.log(err);
    }
  }




  ngOnInit() {

  }


}
