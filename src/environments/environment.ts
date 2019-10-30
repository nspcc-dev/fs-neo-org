// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  neo_node_1: "http://85.143.219.93:20332",
  neo_rpc: "http://85.143.219.93:30333",
  neo_scan: "http://85.143.219.93:4000/api/main_net",
  nep5_script_hash: "9bcd6be0f0d2b731977640d14d7edf7a6b59ea77",
  gas_asset: "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7"
  /*
  neo_node_1: "neo-cli-privatenet-1:20333",
  neo_node_2: "neo-cli-privatenet-2:20334",
  neo_node_3: "neo-cli-privatenet-3:20335",
  neo_node_4: "neo-cli-privatenet-4:20336",
  neo_rpc: "http://localhost:30333",
  neo_scan: "http://localhost:4000/api/main_net",
  nep5_script_hash: "9bcd6be0f0d2b731977640d14d7edf7a6b59ea77",
  gas_asset: "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7"*/
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
