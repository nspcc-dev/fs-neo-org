---
title: NeoFS
description: "NeoFS: public distributed decentralized object storage"
date: 2022-12-16T16:32:57+03:00
draft: false
---

{{<header text="NeoFS: public distributed decentralized object storage" icon="/images/icons/header_icon.svg" >}}

{{<section_markdown text="Introduction">}}
  NeoFS is a distributed, decentralized object storage network developed by [Neo SPCC](https://nspcc.io/). Built with Neo blockchain integration in mind, NeoFS aims to support the shift away from third-party storage providers, providing users with complete control over their data.

  Nodes are organized in peer-to-peer network that takes care of storing and distributing user's data. Any Neo user may participate in NeoFS network and get paid for providing storage resources to other users or store his data in NeoFS and pay a competitive price for it.

  The service is designed to work with Neo smart contracts, allowing for truly decentralized applications, and can also be used as a content delivery network. Users can rent out storage in return for Neo GAS tokens or use GAS to store files in the network.

  Representing Neo’s commitment to building the future, NeoFS offers unparalleled data storage control to users and developers by bringing together the benefits of decentralization and real-world integration.

  NeoFS ensures user data security and mitigates against malignant nodes by ensuring zero-knowledge data validation through a combination of homomorphic cryptography and game theory models.
{{</section_markdown>}}

{{<section_markdown text="NeoFS is geared for real-world applications" type="light-bg">}}
  Unlike many other projects in this area, [Neo SPCC](https://nspcc.io/) is not trying to create a parallel reality in a technological sense. Solving real-world problems requires to use standard protocols and have ability to integrate NeoFS with existing systems. There are protocol adapters, or gateways, that allow accessing NeoFS via standard HTTP or S3 protocols. Users can develop their own gateways to integrate NeoFS with existing systems they are using, such as accounting system, CRM, a corporate backup service etc.
{{</section_markdown>}}

{{<section type="column-reverse">}}
  {{<section_column image="/images/pages/governance_1.png">}}
    <h2>Basic components and network</h2>
    <p>NeoFS network nodes run the same software and talk the same protocol but may have different roles. There are nodes that store data and process user API requests, they are regular storage nodes and form the Outer Ring. There are nodes that take care of network health, perform service tasks such as data audit and payments settlements and form the Inner Ring. There are not many of them and they use dBFT 2.0 consensus algorithm to coordinate their actions.</p>
    {{<button text="Read more" link="/network/">}}
  {{</button>}}
{{</section>}}

{{<section text="Key benefits and competitive advantages" type="light-bg">}}
  {{<key_benefits>}}
    {{<key_benefit number="1" text="Infinitely scalable due to Network Map and Data Placement mechanisms" link="scalable">}}
    {{<key_benefit number="2" text="Designed to work reliably in chaotic environment" link="reliably">}}
    {{<key_benefit number="3" text="Users have full control over how their data is stored and distributed" link="control">}}
    {{<key_benefit number="4" text="Integrated with popular protocols such as HTTP and S3" link="protocols">}}
    {{<key_benefit number="5" text="Zero-knowledge data validation based on homomorphic cryptography" link="cryptography">}}
    {{<key_benefit number="6" text="Directly accessible from smart contract code" link="accessible">}}
    {{<key_benefit number="7" text="Neo GAS is used for payments rather than custom tokens" link="payments">}}
    {{<key_benefit number="8" text="Incentive model based on market principles where all peers agree on prices" link="principles">}}
    {{<key_benefit number="9" text="Runs on commodity hardware" link="hardware">}}
  {{</key_benefits>}}
{{</section>}}

{{<section_markdown text="Infinitely scalable due to Network Map and Data Placement" id="scalable">}}
  NeoFS is infinitely horizontaly scalable due to its architecture features such as novel Data Audit algorithm, Data Placement and Network Map.

  Network Map is a multi-dimensional graph where nodes have attributes and are grouped by those attributes and their values. This allows using a special data placement function to find nodes that would store an object, when putting or getting it to/from NeoFS network without any network requests.

  This approach allows not having any centralized meta-data storage keeping object's locations and not re-balancing data with every joining or leaving storage node.
{{</section_markdown>}}

{{<section text="Designed to work reliably in chaotic environment" type="light-bg" id="reliably">}}
  <p>The bigger the NeoFS network grows, the more stable it becomes, because the chance of network is changed would affect the particular container is decreasing with the increasing number of nodes in the network. It means, unlike in DHT approach, the amount of needed data migration decreases with the network growth.</p>
{{</section>}}

{{<section text="NeoFS puts the control over data in users’ hands" id="control">}}
  <p>Since anyone may participate in NeoFS network, reliable mechanisms to ensure users' data consistency and availability in a chaotic environment are needed.</p>

  <p>To achieve this goal, the combination of homomorphic hashing for data integrity checks and game theory models, to create a situation where all nodes behave correctly and the data is stored safely, is used.</p>

  <p>A decentralized nature of NeoFS eliminates not only centralized points of failure but also centralized points of control. In NeoFS, only users have full control over their data, where, how it is stored, and who can get access to it.</p>

  {{<service_items_flex>}}
    {{<service_item text="Where" subtext="your data is stored" icon="/images/icons/icon3.svg">}}
    {{<service_item text="How" subtext="your data is stored" icon="/images/icons/icon2.svg">}}
    {{<service_item text="Who" subtext="can get access to your data" icon="/images/icons/icon1.svg">}}
  {{</section_markdown>}}
{{</section_markdown>}}

{{<section_markdown text="Integrated with popular protocols such as HTTP and S3" type="light-bg" id="protocols">}}
  NeoFS is demonstrating NEO’s commitment to practical idealism as well as its vision of an integrated, user-centric Internet of the future.

  Through gateways (protocol adapters), users can easily access NeoFS through industry-standard protocols such as HTTP or S3.

  Moreover, the open nature of NeoFS enables users to freely write his or her own gates to integrate with third-party system for seamless on and off-chain integration as well as unmatched accessibility.
{{</section_markdown>}}

{{<section type="column-reverse" id="cryptography">}}
  {{<section_column image="/images/pages/audit.png">}}
    <h2>Zero-knowledge data validation based on homomorphic cryptography</h2>
    <p>In case of a large number of objects in a distributed network of untrusted nodes with an ever-changing topology, classical approach with comparing objects' hashes with some sample in a central meta-data storage is not efficient. This causes unacceptable overhead.</p>
    <p>To solve this problem, NeoFS uses homomorphic hashing. It is a special type of hashing algorithms that allows computing the hash of a composite block from the hashes of individual blocks.</p>
    {{<button text="Read more" link="/audit/">}}
  {{</button>}}
{{</section>}}

{{<section text="Directly accessible from smart contract code" type="light-bg" id="accessible">}}
 <p>This feature becomes available in Neo 3.0 release with introduction of Oracles Protocol. Smart contracts will be able to issue GET and PUT requests for fixed-size objects.</p>
{{</section>}}

{{<section type="column-reverse" id="payments">}}
  {{<section_column image="/images/pages/gasw.png">}}
    <h2>Neo GAS is used for payments</h2>
    <p>NeoFS uses GAS for all payments. To be able to pay for storage services in NeoFS, the one has to deposit some GAS to NeoFS smart contract address. This event is monitored by Inner Ring nodes and reflected in user's account balance internally in NeoFS.</p>
    <p>NeoFS Inner Ring nodes keep track of all NeoFS accounts and use dBFT 2.0 consensus algorithm, the same as in Neo blockchain, agree on users' mutual settlements, reward distribution over node owners and other payment-related procedures.</p>
    {{<button text="Read more" link="/pricing/">}}
  {{</button>}}
{{</section>}}

{{<section_markdown text="Incentive model based on market principles" type="simple" id="principles">}}
  Incentive model and pricing follow a free market principle. Each node declares how much it wants to receive as a reward for data storage services for the upcoming epoch. Placement function considers the declared price and prefers nodes with better prices. However, since nodes in Network Map declare key-value attributes describing their parameters, such as geographical location, type of storage, capacity and other things also used in Storage Policy, it leaves room for nodes that want higher price, better or unique services to still get into the placement function result.

  In short, if node is too greedy, it does not get users and rewards. To have higher prices the node needs to satisfy market demand or provide something unique.

  As it is shown on the figure below, node needs to keep price "in the market" to get the highest profit. This should guarantee a competitive price for data storage in NeoFS.

  ![profit](/images/pages/profit.png)
{{</section_markdown>}}

{{<section text="Runs on commodity hardware" type="light-bg" id="hardware">}}
  <p>NeoFS is designed to work on commodity hardware without any special hardware requirements. This allows users to quickly replace failed system components with what can be bought in a local computer store.</p>
{{</section>}}
