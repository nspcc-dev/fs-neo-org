---
title: Network
date: 2022-12-16T16:32:57+03:00
draft: false
---

{{<section text="Network">}}
  <p>NeoFS network nodes run the same software and talk the same protocol but may have different roles. There are nodes that store data and process user API requests, they are regular storage nodes that form the Outer Ring. There are nodes that take care of network health, perform service tasks, such as data audit and payments settlements, and form the Inner Ring. There are not many of them and they use dBFT 2.0 consensus algorithm to coordinate their actions.</p>

  {{<section_column image="/images/pages/governance_1.png">}}
    <p>Inner Ring nodes are connected to Neo Blockchain. They are constantly monitoring events coming from the blockchain to synchronize their state and the state of NeoFS smart contract that manages users' money deposits and information about Inner Ring nodes themselves.</p>

    <p>Since the Inner Ring is a critical infrastructure part, not every node may get this role. The node willing to join the Inner Ring should be registered in NeoFS smart contract in Neo Blockchain and pay some security deposit that is lost in case of the node starts to behave badly.</p>

    <p>In addition, in the same way as Neo consensus nodes, NeoFS Inner Ring nodes try to achieve maximal possible geographical, political and network decentralization.</p>
  {{</section_column>}}

  <p>The main use case for NeoFS is DApps's data storage and content distribution. Nowadays most DApps do not store their assets in a decentralized fashion that makes them not really distributed applications. In NeoFS, DApps can upload content and distribute it to clients via protocol gates using standard HTTPS protocol or, for example, using NeoFS API from mobile application.</p>

  <p>DApps can access NeoFS directly from smart contract code. For instance, DApp's smart contract can generate some data and put it into NeoFS rather then storing it in the blockchain. Storing data off-chain is significantly cheaper and easier to deliver to client.</p>
{{</section>}}

{{<section text="Network Map" type="simple">}}

  {{<section_column image="/images/pages/container.png">}}
    <p>Inner Ring nodes monitor the state of NeoFS storage nodes. Using this information, they maintain up-to-date Network Map. It is a multi-dimensional graph where nodes have attributes and are grouped by those attributes and their values. This allows using a special data placement function to find nodes that would store an object when putting or getting it in/from NeoFS network.</p>
  {{</section_column>}}

  <p>This approach allows not having any centralized meta-data storage keeping object's locations and not re-balancing data with every joining or leaving storage node, as it happens in DHT-based systems.</p>
{{</section>}}

{{<section_markdown text="Work reliably in chaotic environment" type="simple">}}
  As files are organized in directories in file system, objects are organized in containers in NeoFS.

  Each container is served by a subset of storage nodes that satisfy storage policy defined for this particular container by the user. To calculate that nodes’ subset, storage policy filters are applied to Network Map. The resulting set of nodes is responsible for making sure that storage policy is satisfied and data is not corrupted. In case of success, they share users' payment for data storage. One storage node may serve many containers, so if it behaves correctly small shares from each container summ-up in a significant reward. The same is true for the losses in case of container nodes' misbehavior. This motivates nodes to keep an eye on other container members and properly perform all required replication, migration and data recovery processes.

  Another non-obvious benefit of this approach is the bigger NeoFS network grows, the more stable it becomes, because the chance of network is changed would affect a particular container is decreasing with the increasing number of nodes in the network. It means, unlike in DHT approach, the amount of needed data migration decreases with network growth.
{{</section_markdown>}}

{{<section text="NeoFS Blockchain Components" type="simple">}}

  {{<section_column image="/images/pages/contracts.png">}}
    <p>The main smart contracts that provide the input and output of GAS tokens to the NeoFS account and the list of nodes of Inner Ring, are on the Neo Mainnet. NeoFS internal banking and data audit results are on the sidechain. This allows not to load a large number of NeoFS internal transactions to the Neo blockchain network. This approach also allows us to achieve complete anonymity of the Inner Ring nodes and not to disclose them to other network nodes.</p>

    <p>The main NeoFS network contract is deployed in the Neo main network. The roles of this contract are to maintain the list of the Inner Ring nodes, maintain the list of nodes-candidates for Inner Ring, accept Neo GAS input assets from users, and withdraw Neo GAS to users.</p>

    <p>Service contracts of the NeoFS network such as Network Map contract, Container contract, Balance contract, Data Audit contract, and Reputation contract are on the NeoFS Neo sidechain.</p>

    <p>The Network Map contract is the main NeoFS network contract in the NeoFS Neo sidechain. The roles of this contract are to provide to the sidechain contracts a list of the Inner Ring nodes, which is initially stored in the Neo main network blockchain in the NeoFS contract, to manage the list of Storage nodes, maintain the Network Map, to take snapshots of Network Map when a new epoch sets, and store the epoch counter, providing an interface for changing the epoch to the Inner Ring nodes. Epoch is a real-time period during which a permanent Network Map exists.</p>
  {{</section_column>}}

  <p>The Container contact is deployed in the NeoFS Neo sidechain. The roles of this contract are to maintain a list of containers and provide such operations as to get a specific container by its identifier, to get a list of all user containers, and to get a list of all containers.</p>

  <p>The Balance contact, being in the NeoFS Neo sidechain, provides the internal NeoFS banking performing a large number of fast microtransactions based on the results of the NeoFS network.</p>

  <p>The Reputation contract’s role is maintaining reputation ratings of Storage nodes. This contract is also deployed in the NeoFS Neo sidechain to process a lot of invocations to process the view of Storage nodes' trust.</p>

  <p>Neo main network chain and NeoFS Neo sidechain do not interact directly. The bridge between the two chains is Inner Ring which subscribes to events from both chains. The Inner Ring nodes are responsible for servicing the Neofs network, monitoring Storage nodes, and data integrity of the storage network.</p>

  <p>The Inner Ring nodes are connected to Neo Blockchain. They are constantly monitoring events coming from the blockchain to synchronize their state, the state of the NeoFS smart contract that manages users' GAS deposits and information about the Inner Ring nodes themselves, and NeoFS Neo sidechain smart contracts.</p>
{{</section>}}

{{<section text="Protocol Gates" type="simple">}}
  <p>To interact with existing systems using standard protocols, NeoFS has protocol gates. Gates are mainly maintained by users and not a part of NeoFS network. From the start, <a href="https://github.com/nspcc-dev/neofs-rest-gw/">REST protocol gateway</a> is provided, that allows accessing data from NeoFS using regular browser. <a href="https://github.com/nspcc-dev/neofs-s3-gw/">AWS S3 gateway</a> is also provided to allow users to make more sophisticated integrations. Technically one may easily develop own gate by using NeoFS protocol libraries.</p>
{{</section_markdown>}}
