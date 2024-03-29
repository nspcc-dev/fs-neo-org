---
title: Hosting
date: 2022-12-16T16:32:57+03:00
draft: false
---

{{<section_markdown text="Hosting" style="padding: 80px 0 0 0">}}
  The website contents is stored as a set of objects in a NeoFS container. Each object has a `FilePath` attribute with a corresponding file name (`index.html`, `img/something.png`, etc), they also have a `Content-Type` attribute with appropriate type (`text/html`, `image/png`, etc). These objects are uploaded from the website release tarball using [neofs-cli](https://github.com/nspcc-dev/neofs-node), if there is an update, new objects are uploaded first and then all old ones are deleted. Only NeoFS storage nodes have data for this container.

  We have an [nginx](https://nginx.org/) instance accepting initial user's connections, it:
  * handles TLS connections (certificates/encryption)
  * accepts original HTTP requests
  * rewrites these requests, so that they could be processed by [NeoFS REST gateway](https://github.com/nspcc-dev/neofs-rest-gw)
    - each original request gets converted into `/v1/get_by_attribute/$CID/FilePath/$PATH` where `$CID` is the container ID storing website's objects and `$PATH` is the original request (`index.html`, `img/something.png`, etc)
    - additional rules convert requests to directories `/something/` into the same `v1/get_by_attribute` API, but with an `index.html` appended
  * passes these rewritten requests to one of the configured NeoFS REST gateways (there is a number of them)
  * caches responses
  There can be multiple nginx instances (they only have key/certificate and configuration), but at the moment we're using one.
{{</section_markdown>}}
{{<section style="padding: 0">}}
  {{<spoiler text="Nginx config">}}
            rewrite '^/$'                       /v1/get_by_attribute/$cid/FilePath/index.html break;
            rewrite '^/(.+)/$'                  /v1/get_by_attribute/$cid/FilePath/$1/index.html break;
            rewrite '^/(.+)$'                   /v1/get_by_attribute/$cid/FilePath/$1 break;
            proxy_pass https://$neofs_rest_gateway;
  {{</spoiler>}}
{{</section>}}
{{<section_markdown style="padding: 20px 0 80px 0">}}
  Then the request is picked up by [NeoFS REST gateway](https://github.com/nspcc-dev/neofs-rest-gw):
  * it translates `get_by_attribute` REST request into [NeoFS API](https://github.com/nspcc-dev/neofs-api) `SEARCH` request which tries to find objects in container `$CID` with `FilePath` attribute equal to the requested one
  * this request gets sent to one of the NeoFS storage nodes configured in the gateway (there are multiple of them)
  * nodes reply with object IDs corresponding to search request (it should be a single OID)
  * REST gateway then issues a NeoFS `GET` request for appropriate CID/OID combination
  * this request can also be sent to any of configured NeoFS storage nodes
  * it receives a reply with content, caches it and replies to nginx

  NeoFS nodes just do their job in this scheme, serving `SEARCH` and `GET` (`PUT` as well, for uploads) requests in a usual manner. Containers are set up with basic ACL that allows anyone to read (it's a widely open website), but allows only owner to upload new content.

  ![hosting scheme](/images/pages/hosting.png)
{{</section_markdown>}}
