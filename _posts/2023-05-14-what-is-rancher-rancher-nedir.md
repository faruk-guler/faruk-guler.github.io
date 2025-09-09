---
layout: post
title: What is Rancher? - Rancher Nedir?
date: 2023-05-14 22:23
author: theguler
comments: true
categories: [Containerization]
---
<!-- wp:image {"id":11824,"width":"491px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/suse-rancher.jpg?w=1024" alt="" class="wp-image-11824" style="width:491px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Rancher is an open source platform for managing containerization environments. It is specifically designed to manage and facilitate container orchestration tools such as Kubernetes and Docker Swarm. Rancher has an easy-to-install and use structure that can run in multi-cloud environments <strong>(Amazon Web Services (AWS), Microsoft Azure Google Cloud Platform (GCP), VMware vSphere OpenStack DigitalOcean Linode IBM Cloud Alibaba Cloud Oracle Cloud Infrastructure, etc.)</strong> and physical servers.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Rancher Install on Docker</strong>:<br>#sudo docker run -d --restart=unless-stopped -p 80:80 -p 443:443 --name=rancher --privileged -v /var/run/docker.sock:/var/run/docker.sock -v rancher_data:/var/lib/rancher rancher/rancher<br><br><strong>#Rancher Startup configuration</strong><br>docker ps<br>docker logs  container-id  2&gt;&amp;1 | grep "Bootstrap Password:"<br><br><strong>#See Address list</strong><br>http://your-server-address:80<br>https://your-server-address:443<br>#Rancher volume: /var/lib/docker/volumes/rancher_data/</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":11838,"width":"655px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/rancher_cow.jpg?w=900" alt="" class="wp-image-11838" style="width:655px;height:auto" /></figure>
<!-- /wp:image -->
