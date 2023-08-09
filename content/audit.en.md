---
title: Audit
date: 2022-12-16T16:32:57+03:00
draft: false
---

{{<section_markdown "Zero-knowledge and Homomorphic hashing">}}
  In case of a large number of objects in a distributed network of untrusted nodes with an ever-changing topology, classical approach with comparing objects' hashes with some sample in a central meta-data storage is not efficient. This causes unacceptable overhead.

  To solve this problem, NeoFS uses Homomorphic hashing. It is a special type of hashing algorithms that allows computing the hash of a composite block from the hashes of individual blocks.

  For integrity checks, NeoFS calculates a composite homomorphic hash of all the objects in a group under control and puts it into a structure called Storage Group. During integrity checks, NeoFS nodes can ensure that hashes of stored objects are correct and a part of that initially created composite hash. This can be done without moving object's data over the network and no matter how many objects are in a storage group, the hash size is the same.
{{</section_markdown>}}

{{<section_markdown "Data Audit" "simple">}}
  How does NeoFS ensure data is not lost or corrupted? Each epoch, Inner Ring nodes perform Data Audit. It is a two-stage game in terms of game theory. At the first stage, nodes in a selected container are asked to collectively reconstruct a list of homomorphic hashes that would form a composite hash stored in storage group. By doing this, nodes demonstrate that they have all objects and are able to provide hash of those objects. The provided list of hashes can be validated, but at this stage, it is unknown, if some nodes are lying.

  ![audit](/images/pages/audit.png)

  At the next stage, it is necessary to make sure that nodes are honest and do not fake check results. Inner Ring nodes calculate a set of nodes’ pairs that store the same objects and ask each node to provide thee homomorphic hashes of this object. Ranges are chosen in a way that the hash of a range asked from one node would be the composite hash of ranges asked from another node in that pair. Nodes cannot predict objects or ranges that would be chosen for audit. They cannot even predict a pair node for the game. This stage discovers malicious nodes fast because each node is serving multiple containers and storage groups and participates in many data audit sessions. When node is caught in a lie it will not get any rewards for this epoch. So the price of faking checks and risks is too high and it is easier and cheaper for the node to be honest and behave correctly.

  Combining the fact of nodes being able to reconstruct the storage group's composite hash and the fact of nodes' honest behavior, the system can consider that data is safely stored, not corrupted and available with a high probability.
{{</section_markdown>}}
