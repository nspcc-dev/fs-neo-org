---
title: Pricing
date: 2022-12-16T16:32:57+03:00
draft: false
---

{{<price_calculator text="Storage Price Calculator" caption="GAS is used to pay for data storage and depends on the size of the data you store. To calculate the GAS cost per month, use the calculator where you need to select the number of megabytes you want to store. You can also choose how many copies of the data to include in the cost.">}}

{{<section_markdown text="Neo GAS 令牌输入" type="simple">}}
  NeoFS使用 Neo GAS支付所有费用。要想在NeoFS支付储存服务的费用，您必须将一些GAS储存到NeoFS的智能合约地址。该事件由内环节点监控，并在NeoFS内部反映在用户的账户余额中。 NeoFS uses Neo GAS for all payments. To be able to pay for storage services in NeoFS, the one has to deposit some GAS to NeoFS smart contract address. This event is monitored by Inner Ring nodes and reflected in user's account balance internally in NeoFS.

  NeoFS内环节点跟踪所有NeoFS账户，同时使用与Neo区块链相同的dBFT 2.0共识算法，并就用户相互结算、节点所有者奖励分配以及其他与支付相关流程达成协议。

  例如，某人可能拥有几个存储节点并提供存储服务，但同时使用NeoFS将其备份存储在不同的地理位置。在此情况下，来自存储节点的奖励可用于自动支付备份费用，而无需在Neo区块链中进行事务处理。

  ![gasi](/images/pages/gasi.png)
{{</section_markdown>}}

{{<section_markdown text="Neo GAS令牌撤回" type="simple">}}
  可将NeoFS内积聚的GAS撤回至Neo区块链地址。为此，用户必须向NeoFS发出撤回调用。内环节点锁定所需的金额，并签发由所有内环节点签名的支票。然后，用户必须调用NeoFS智能合同，并为其提供该支票。若验证成功，则智能合约将向用户地址发送GAS，而内环节点将该等变化反映在内部账户余额中。如支票在有效期内未使用，则用于撤回的GAS锁将被解锁。

  ![gasw](/images/pages/gasw.png)
{{</section_markdown>}}
