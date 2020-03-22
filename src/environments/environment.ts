// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  wallet_rpc: "http://localhost:4200/api/", // "http://178.62.234.54:8081"
  neofs_api: "http://localhost:4200/api/", // "http://178.62.234.54:8081"
  neo_node_1: "http://localhost:4200/neo_node/",//"http://85.143.219.93:20332",
  neo_rpc: "http://localhost:4200/neo_rpc/",//"http://85.143.219.93:30333",
  neo_scan: "http://localhost:4200/neo_scan/", //"http://85.143.219.93:4000/api/main_net",
  gas_asset: "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7",
  neofs_sc: "dcc5902c9e8c63286894015ffd27097fd0ac9656"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
