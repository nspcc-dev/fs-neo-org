// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  neofs_api: "http://localhost:4200/api", 
  neo_rpc: "http://localhost:4200/neo_rpc",
  neofs_send_url: "https://send.fs.neo.org",
  gas_asset: "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7",
  neofs_sc: "67560720693416608bda4e4d7f9b665c5690dbfc"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
