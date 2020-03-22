import { Component, OnInit } from '@angular/core';
import Neon, { rpc } from "@cityofzion/neon-js";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit {

  constructor(public router: Router, private http: HttpClient) { }

  await_result_gas: boolean = false;

  show_processing = false;

  show = false;
  autohide = false;
  header = ""
  alert_type = ""
  message = "";

  show_p = false;
  autohide_p = false;
  header_p = ""
  alert_type_p = ""
  message_p = "";

  show_sec = false;
  autohide_sec = false;
  header_sec = ""
  alert_type_sec = ""
  message_sec = "";

  show_sec_p = false;
  autohide_sec_p = false;
  header_sec_p = ""
  alert_type_sec_p = ""
  message_sec_p = "";

  async onClickCheck(formData) {
    try {
      this.show = false;
      this.show_sec = false;
      this.show_p = false;
      this.show_sec_p = false;

      this.show_processing = false;

      if (Neon.is.address(formData.u_address) == false) {
        this.alert_type = "danger"
        this.header = "ERROR:"
        this.message = "Incorrect Neo address"
        this.show = true;
      }
      else {

        let promise = this.http.get(`${environment.neofs_api}/balance/gas/${formData.u_address}/`).toPromise();

        promise.then((data) => {

          this.await_result_gas = false;
          this.alert_type = "success";
          this.header = "GAS Balance:";
          this.message = JSON.stringify(data);
          this.show = true;
        }).catch((error) => {
          this.alert_type = "danger"
          this.header = "ERROR:"
          this.message = error.error
          this.show = true;
        });


        let promise_nep = this.http.get(`${environment.neofs_api}/balance/gas3/${formData.u_address}/`).toPromise();

        promise_nep.then((data) => {

          this.await_result_gas = false;
          this.alert_type_sec = "success";
          this.header_sec = "NEP-5 GAS Balance:";
          this.message_sec = JSON.stringify(data);
          this.show_sec = true;
        }).catch((error) => {
          this.alert_type_sec = "danger"
          this.header_sec = "ERROR:"
          this.message_sec = error.error
          this.show_sec = true;
        });

      }
    }
    catch (err) {
      console.log(err);
    }
  }

  async await_tx(tx, type) {
    let i = 1;
    let resp_check;

    while (i < 20 && resp_check != 1) {
      await this.delay(2000);
      resp_check = await this.check_tx_req(tx);
      i++;
    }

    return resp_check

  }

  async check_tx_req(gas_tx_nep) {

    let check_res;

    const query2 = Neon.create.query({ id: 0, method: "gettransactionheight", params: [gas_tx_nep] });
    let promisefs = this.http.post(`${environment.neo_node_1}`, query2.req).toPromise();

    await promisefs.then((data) => {
      if (data["result"] != 0) {
        check_res = 1;
      }

    }).catch((error) => {

      console.log(JSON.stringify(error.error));

    });

    return check_res;
  }


  async get_gas_req(formData) {

    let promisefs = this.http.get(`${environment.neofs_api}/send/gas/${formData.u_address}/1/`).toPromise();
    let gas_tx_nep;
    await promisefs.then((data) => {

      this.alert_type = "warning";
      this.header = "Transaction (GAS) has been successfully sended. Awaiting of the block.";
      this.message = "TX: " + JSON.stringify(data);
      this.show = true;

      gas_tx_nep = JSON.stringify(data).replace(/"/g, "");
      gas_tx_nep = gas_tx_nep.replace(/0x/, "");

    }).catch((error) => {
      this.alert_type = "danger"
      this.header = "ERROR:"
      this.message = error.error
      this.show = true;

    });

    return gas_tx_nep
  }


  async get_gas3_req(formData) {

    let promisefs = this.http.get(`${environment.neofs_api}/send/gas3/${formData.u_address}/1/`).toPromise();
    let gas_tx_nep;

    await promisefs.then((data) => {

      //this.await_result_gas = false;
      this.alert_type_sec = "warning";
      this.header_sec = "Transaction (NEP-5 GAS) has been successfully sended. Awaiting of block.";
      this.message_sec = "TX: " + JSON.stringify(data);
      this.show_sec = true;

      gas_tx_nep = JSON.stringify(data).replace(/"/g, "");
      gas_tx_nep = gas_tx_nep.replace(/0x/, "");

    }).catch((error) => {
      this.alert_type_sec = "danger"
      this.header_sec = "ERROR:"
      this.message_sec = error.error
      this.show_sec = true;

    });

    return gas_tx_nep
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async onClickSubmit(formData) {
    try {

      this.show_processing = false;

      this.show = false;
      this.show_sec = false;
      this.show_p = false;
      this.show_sec_p = false;

      if (this.await_result_gas == true) {
        this.alert_type = "alert"
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

        this.show_processing = true;

        this.await_result_gas = true;

        let tx = await this.get_gas_req(formData);

        let type = "GAS";
        let resp_check = await this.await_tx(tx, type)

        if (resp_check == 1) {
          this.alert_type_p = "success";
          this.header_p = `${type} has been successfully sended.`;
          this.message_p = "TX is accepted in block.";
          this.show_p = true;
        }
        else {
          this.alert_type_p = "danger"
          this.header_p = `ERROR (${type}):`
          this.message_p = "Tx has not been accepted."
          this.show_p = true;
        }


        if (resp_check == 1) {

          type = "NEP-5 GAS";
          let tx_nep = await this.get_gas3_req(formData);
          let resp_check_nep = await this.await_tx(tx_nep, type)

          if (resp_check_nep == 1) {
            this.alert_type_sec_p = "success";
            this.header_sec_p = `${type} has been successfully sended.`;
            this.message_sec_p = "TX is accepted in block.";
            this.show_sec_p = true;
          }
          else {
            this.alert_type_sec_p = "danger"
            this.header_sec_p = `ERROR (${type}):`
            this.message_sec_p = "Tx has not been accepted."
            this.show_sec_p = true;
          }

        }

        this.show_processing = false;


      }
    }
    catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {

  }


}
