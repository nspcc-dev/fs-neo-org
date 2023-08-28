---
title: NeoFS
description: "NeoFS: 公共分布式分散对象存储"
date: 2022-12-16T16:32:57+03:00
draft: false
---

{{<header text="NeoFS: 公共分布式分散对象存储" icon="/images/icons/header_icon.svg" >}}

{{<section_markdown text="引入">}}
  NeoFS是由[Neo SPCC](https://nspcc.io/)开发的分布式、分散式的对象存储网络。鉴于Neo区块链集成，NeoFS旨在支持第三方存储提供商的转移，为用户提供对其数据的完全控制。

  节点被有条理的安排在对等网络中，负责用户数据的存储和分发。任何Neo用户均可参与NeoFS网络，此外，因向其他用户提供存储资源或将其数据存储在NeoFS中而获得报酬，并为此支付有竞争力的价格。

  该服务旨在与Neo智能合约一起工作以支持真正的去中心化应用，该服务也可以用作内容分发网络。用户可以出租存储空间以换取Neo GAS令牌，或者使用GAS在网络中存储文件。

  NeoFS体现了Neo对构建未来的承诺，通过将分散化和真实世界集成的好处结合在一起，为用户和开发人员提供了无与伦比的数据存储控制。

  NeoFS通过将同态密码学和博弈论模型相结合以确保零知识数据验证，从而确保用户数据安全并缓解恶性节点的攻击。
{{</section_markdown>}}

{{<section_markdown text="NeoFS可面向实际应用" type="light-bg">}}
  不同于该领域的许多其他项目，[Neo SPCC](https://nspcc.io/)并非试图在技术领域创建平行现实。解决现实问题需使用标准协议，并具备将NeoFS与现有系统集成的能力。其中，协议适配器或网关可通过标准HTTP或S3协议访问NeoFS。用户可以开发自己的网关，将NeoFS于其正在使用的现有系统集成，如会计系统、CRM、企业备份服务等。
{{</section_markdown>}}

{{<section type="column-reverse">}}
  {{<section_column image="/images/pages/governance_1.png">}}
    <h2>基本组件及网络</h2>
    <p>尽管NeoFS网络节点运行相同的软件并使用相同的协议，但它们可能扮演不同的角色。其中，有部分节点可以存储数据并处理用户API请求，它们属于常规存储节点，并形成外环。此外，还有有些节点负责网络健康运行、执行数据审计和支付结算等服务任务，并形成内环。该类节点不是很多，它们使用dBFT 2.0一致性算法来协调其操作。</p>
    {{<button text="读取更多" link="/network/">}}
  {{</button>}}
{{</section>}}

{{<section text="关键利益和竞争优势" type="light-bg">}}
  {{<key_benefits>}}
    {{<key_benefit number="1" text="由于网络地图和数据布局机制，可无限扩展" link="scalable">}}
    {{<key_benefit number="2" text="旨在在混沌环境中可靠地工作" link="reliably">}}
    {{<key_benefit number="3" text="用户可以完全控制其数据的存储和分发方式" link="control">}}
    {{<key_benefit number="4" text="与诸如HTTP和S3之类的主流协议集成 " link="protocols">}}
    {{<key_benefit number="5" text="基于同态密码学的零知识数据验证 " link="cryptography">}}
    {{<key_benefit number="6" text="可使用智能合约代码直接访问" link="accessible">}}
    {{<key_benefit number="7" text="Neo GAS用于付款，而非自定义令牌" link="payments">}}
    {{<key_benefit number="8" text="基于市场原则的激励模式，所有同行均同意的价格" link="principles">}}
    {{<key_benefit number="9" text="在商用硬件上运行" link="hardware">}}
  {{</key_benefits>}}
{{</section>}}

{{<section_markdown text="网络地图和数据布局可无限扩展" id="scalable">}}
  NeoFS由于其新颖的数据审计算法、数据布局和网络地图等架构特性，因此它具有无限的水平可扩展性。.

  网络地图是一种多维图，其中节点具有属性，可根据该等属性及其数值进行分组。当无任何网络请求的情况下将对象置于NeoFS网络或从NeoFS网络获取对象时，可使用特殊的数据布局功能以查找将存储对象的节点。

  该方法不允许使用任何集中式元数据存储来保存对象的位置，也不允许在每次连接或离开存储节点时重新平衡数据。
{{</section_markdown>}}

{{<section text="旨在混乱环境中可靠的工作" type="light-bg" id="reliably">}}
  <p>NeoFS网络发展得越大，网络就会越稳定，因为随着网络中节点数量的增加，网络的改变会影响到特定包容器的机会在减少。这意味着，需要迁移的数据量随网络的增长而减少，它与DHT方法不同。</p>
{{</section>}}

{{<section text="NeoFS将数据的控制权交予用户" id="control">}}
  <p>由于任何人均可参与NeoFS网络，因此需要可靠的机制以确保用户在混沌环境中数据的一致性和可用性。</p>

  <p>为实现该目标，可使用保证数据完整性检查的同态哈希与博弈论模型相结合，以创建所有节点均正常运行且数据安全存储的情况。</p>

  <p>NeoFS的分散性不仅消除了集中性的故障点，也消除了集中性的控制点。在NeoFS中，仅用户才可完全控制其数据，包括数据的存储位置、存储方式以及谁可以访问它们。</p>

  {{<service_items_flex>}}
    {{<service_item text="地点" subtext="您的数据已存储" icon="/images/icons/icon3.svg">}}
    {{<service_item text="方式" subtext="您的数据已存储" icon="/images/icons/icon2.svg">}}
    {{<service_item text="谁" subtext="可以访问您的数据" icon="/images/icons/icon1.svg">}}
  {{</section_markdown>}}
{{</section_markdown>}}

{{<section_markdown text="与诸如HTTP和S3之类的主流协议集成" type="light-bg" id="protocols">}}
  NeoFS展示了NEO对现实理想主义的承诺，以及其对集成、以用户为中心的未来互联网的愿景。

  通过网关(协议适配器)，用户可以通过HTTP或S3等行业标准协议轻松访问NeoFS。

  此外，NeoFS的开放性使用户可以自由编写自己的门户，并与第三方系统集成，以实现无缝的链上和链下集成以及无与伦比的可访问性。
{{</section_markdown>}}

{{<section type="column-reverse" id="cryptography">}}
  {{<section_column image="/images/pages/audit.png">}}
    <h2>基于同态密码学的零知识数据验证</h2>
    <p>在拓扑结构不断变化的不可信节点的分布式网络中，如果存在大量对象，则将对象哈希值与中央元数据存储中的样本进行比较的传统方法无效。从而导致不可接受的开销。</p>
    <p>为解决该问题，NeoFS使用了同态哈希。这是一种特殊类型的哈希算法，它可根据单个数据块的哈希来计算复合块的哈希。</p>
    {{<button text="读取更多" link="/audit/">}}
  {{</button>}}
{{</section>}}

{{<section text="可使用智能合约代码直接访问" type="light-bg" id="accessible">}}
 <p>随着Oracles协议的引入，此功能在Neo 3.0版本中可用。智能合约能够对固定大小的对象发出GET和PUT请求。</p>
{{</section>}}

{{<section type="column-reverse" id="payments">}}
  {{<section_column image="/images/pages/gasw.png">}}
    <h2>Neo GAS用于支付</h2>
    <p>NeoFS使用GAS支付所有费用。要想在NeoFS支付储存服务的费用，您必须将一些GAS储存到NeoFS的智能合约地址。该事件由内环节点监控，并在NeoFS内部反映在用户的账户余额中。</p>
    <p>NeoFS内环节点跟踪所有NeoFS账户，同时使用与Neo区块链相同的dBFT 2.0共识算法，并就用户相互结算、节点所有者奖励分配以及其他与支付相关流程达成协议。</p>
    {{<button text="读取更多" link="/gas/">}}
  {{</button>}}
{{</section>}}

{{<section_markdown text="基于市场原则的激励模式" type="simple" id="principles">}}
  激励模式和定价务均遵循自由市场原则。每个节点均声明其要为即将到来的时代提供数据存储服务的报酬作为奖励。布局功能需考虑声明的价格，并选择价格更好的节点。然而，由于网络地图中的节点声明了描述其参数的键值属性，例如地理位置、存储类型、容量和其他存储策略中也使用的东西，这就为希望获得更高价格、更好或独特服务的节点仍然可以进入布置功能结果而保留了空间。

  简而言之，如果节点过于贪婪，它便不会获得用户和奖励。因此，为获取更高价格，节点需要满足市场需求或提供独特产品。

  如下图所示，节点需要将价格保持"在市场中"以获得最高利润。保证从而NeoFS中数据存储的价格具有竞争力。

  ![profit](/images/pages/profit.png)
{{</section_markdown>}}

{{<section text="在商用硬件上运行" type="light-bg" id="hardware">}}
  <p>NeoFS旨在为商用硬件而工作，无任何特殊硬件要求。这使得用户可以使用在本地计算机商店购买的系统组件快速替换出现故障的系统组件。</p>
{{</section>}}
