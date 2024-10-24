---
layout: post
title: Docker Swarm Nedir?
date: 2023-11-08 16:52
author: theguler
comments: true
categories: [Containerization]
---
<!-- wp:image {"id":11654,"width":"400px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/1_f0udyxfjbxnuyp87m7u7pq.png?w=800" alt="" class="wp-image-11654" style="width:400px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Docker Swarm, Docker'ın dahili bir özelliği olan ve konteyner tabanlı uygulamaları yönetmek ve dağıtmak için kullanılan bir konteyner yönetim ve orkestrasyon aracıdır. Swarm, bir grup Docker ana bilgisayarını birbirine bağlayarak tek bir sanal Docker ana bilgisayarı gibi davranmalarını sağlar. Bu, Swarm'a bağlı konteynerlerin, Docker host'ları arasında otomatik olarak dağıtılmasını ve yönetilmesini sağlar.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#<strong>Docker Swarm status:</strong><br>docker info<br>docker info | grep Swarm<br><br>#<strong>Swarm is Activate:</strong><br><strong>#By default (3) manager is recommended</strong><br><strong>#To enable the Swarm manager to identify itself to other nodes: (IP)</strong><br>docker swarm init --advertise-addr 10.5.10.22<br><br><strong>#Joining a new node as Docker Swarm (***Manager): (command) and (token)</strong><br>docker swarm join-token manager<br><br><strong>#<strong>Joining a new node as Docker Swarm</strong></strong> <strong>(***Worker): (command) and (token)</strong><br>docker swarm join-token worker<br><br><strong>#List all nodes in a Docker Swarm cluster</strong><br>docker node ls<br><br><strong>#Remove node from Swarm</strong><br>#docker swarm leave<br>#docker swarm leave --force<br><br><strong>#Remove node from remote Swarm</strong><br>#docker node rm &lt;id&gt;<br><br><strong>#Swarm Node Role Update (Demote-Promote)</strong><br>docker node update --role manager dockernode-3<br>docker node update --role worker dockernode-1<br><br><strong>#Create 5 copies of httpd services on "All Swarm Nodes!!!"</strong><br>#docker service create --name pantera --replicas=5 -p 3535:80 nginx<br><br><strong>#Ensure that the service is distributed (only Worker Nodes)</strong><br>docker service create --name pantera --replicas=5 --constraint 'node.role==worker' -p 3333:80 httpd<br><br><strong>#Scale service (Replicated Mode):</strong><br>docker service scale pantera=14<br>docker service scale pantera=7<br><br><strong>#Scale service (Global Mode):</strong><br>docker service create --name webserver --mode=global -p 80:80 nginx<br><br><strong>#Listing services in Docker Swarm:</strong><br>docker service ls<br><br><strong>#Delete services:</strong><br>docker service rm pantera<br><br><strong>#List details of the service: (tasks)</strong><br>docker service ps pantera</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->
