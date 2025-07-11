---
title: Pricing
date: 2022-12-16T16:32:57+03:00
draft: false
---

{{<price_calculator text="Storage Price Calculator" caption="GAS is used to pay for data storage and depends on the size of the data you store. To calculate the GAS cost per month, use the calculator where you need to select the number of megabytes you want to store. You can also choose how many copies of the data to include in the cost.">}}

{{<section_markdown text="Neo GAS token input" type="simple">}}
  NeoFS uses Neo GAS for all payments. To be able to pay for storage services in NeoFS, the one has to deposit some GAS to NeoFS smart contract address. This event is monitored by Inner Ring nodes and reflected in user's account balance internally in NeoFS. NeoFS uses Neo GAS for all payments. To be able to pay for storage services in NeoFS, the one has to deposit some GAS to NeoFS smart contract address. This event is monitored by Inner Ring nodes and reflected in user's account balance internally in NeoFS.

  NeoFS Inner Ring nodes keep track of all NeoFS accounts and use dBFT 2.0 consensus algorithm, the same as in Neo blockchain, agree on users' mutual settlements, reward distribution over node owners and other payment-related procedures.

  For instance, someone may own a few storage nodes and provide storage services, but at the same time use NeoFS for storing his or her backups in different geographical locations. In this case, rewards from storage nodes may be used to pay for backups automatically without transactions in Neo Blockchain.

  ![gasi](/images/pages/gasi.png)
{{</section_markdown>}}

{{<section_markdown text="Neo GAS token withdraw" type="simple">}}
  It is possible to withdraw GAS accumulated inside NeoFS to Neo Blokchain address. To do so, the user has to issue withdraw call to NeoFS. Inner Ring nodes lock the desired amount and issue a cheque signed by all Inner Ring nodes. Then the user has to invoke NeoFS smart contract, providing it with this cheque. If it is verified successfully smart contract will send GAS to the user's address and Inner Ring nodes will reflect those changes in the internal account balance. If cheque is not used during validity period GAS locked for withdrawal will be unlocked.

  ![gasw](/images/pages/gasw.png)
{{</section_markdown>}}
