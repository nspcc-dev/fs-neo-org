---
title: Gas
date: 2022-12-16T16:32:57+03:00
draft: false
---

{{<section_markdown "Incentive model">}}
  Incentive model and pricing follows a free market principles. Each node declares how much it wants to receive as a reward for data storage services for the upcoming epoch. Placement function considers the declared price and prefers nodes with better prices. However, because nodes in Network Map declare key-value attributes describing their parameters, such as geographical location, type of storage, capacity and other things also used in Storage Policy, it leaves room for nodes that want higher price, better or unique services to still get into the placement function result.

  In short, if node is too greedy it does not get users and rewards. To achieve higher prices, node needs to satisfy market demand or provide something unique.

  ![profit](/images/pages/profit.png)

  As it is shown on the figure above, the node needs to keep price "in the market" to get the highest profit. This should guarantee a competitive price for data storage in NeoFS.


{{</section_markdown>}}

{{<section_markdown "Neo GAS token input" "simple">}}
  NeoFS uses Neo GAS for all payments. To be able to pay for storage services in NeoFS, the one has to deposit some GAS to NeoFS smart contract address. This event is monitored by Inner Ring nodes and reflected in user's account balance internally in NeoFS. NeoFS uses Neo GAS for all payments. To be able to pay for storage services in NeoFS, the one has to deposit some GAS to NeoFS smart contract address. This event is monitored by Inner Ring nodes and reflected in user's account balance internally in NeoFS.

  NeoFS Inner Ring nodes keep track of all NeoFS accounts and use dBFT 2.0 consensus algorithm, the same as in Neo blockchain, agree on users' mutual settlements, reward distribution over node owners and other payment-related procedures.

  For instance, someone may own a few storage nodes and provide storage services, but at the same time use NeoFS for storing his or her backups in different geographical locations. In this case, rewards from storage nodes may be used to pay for backups automatically without transactions in Neo Blockchain.

  ![gasi](/images/pages/gasi.png)
{{</section_markdown>}}

{{<section_markdown "Neo GAS token withdraw" "simple">}}
  It is possible to withdraw GAS accumulated inside NeoFS to Neo Blokchain address. To do so, the user has to issue withdraw call to NeoFS. Inner Ring nodes lock the desired amount and issue a cheque signed by all Inner Ring nodes. Then the user has to invoke NeoFS smart contract, providing it with this cheque. If it is verified successfully smart contract will send GAS to the user's address and Inner Ring nodes will reflect those changes in the internal account balance. If cheque is not used during validity period GAS locked for withdrawal will be unlocked.

  ![gasw](/images/pages/gasw.png)
{{</section_markdown>}}
