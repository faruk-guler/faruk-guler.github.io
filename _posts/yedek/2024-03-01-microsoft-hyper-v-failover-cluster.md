---
layout: post
title: Microsoft Hyper-V [Failover Cluster]
date: 2024-03-01 22:59
author: theguler
comments: true
categories: [Hyper-V]
---
<!-- wp:image {"id":11059,"width":"436px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/hyper-v.jpg?w=1024" alt="" class="wp-image-11059" style="width:436px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#GENERAL:</strong><br>required: Active Directory<br>required: OS:Equal<br>required: Domain:guler.com<br>required: Minimum Machine (2 Server)<br><br><strong>#ROLES:</strong><br>required: Microsoft Hyper-V Roles (for 2 VMs)<br>required: Microsoft Failover Clustering Roles (for 2 VMs)<br>required: Microsoft Multipath I/O Roles (for 2 VMs)<br><br><strong>#NETWORKING:</strong><br>required: VMs Switch: Microsoft Network Adapter Multiplexor Driver<br>required: Switch Teaming (Virtual or Physical)<br>required: Microsoft NIC Teaming Tool<br>required: 3 Network Connections (2 Teaming) (1 Heartbeat)<br><br><strong>#STORAGE:</strong><br>required: Common Shared Storage (NAS/SAN)<br>required: Quorum Disk<br><br><strong>#Load Balancing:</strong><br>Round Robin: DNS Load Balancing<br>NLB: Network Load Balancing<br>ARR: Application Request Routing<br>NIC Teaming: Network Interface Card Teaming</pre>
<!-- /wp:preformatted -->
