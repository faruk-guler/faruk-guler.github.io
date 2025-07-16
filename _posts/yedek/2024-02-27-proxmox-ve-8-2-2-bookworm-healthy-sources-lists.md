---
layout: post
title: Proxmox VE 8.2.2 Bookworm Healthy Sources Lists
date: 2024-02-27 01:48
author: theguler
comments: true
categories: [Virtualization Technology]
---
<!-- wp:image {"id":12877,"width":"509px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/proxmox-logo.webp?w=1024" alt="" class="wp-image-12877" style="width:509px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#---&gt; /etc/apt/sources.list</strong><br><br><strong>root@vm-host:~# nano /etc/apt/sources.list</strong><br>deb http://ftp.tr.debian.org/debian bookworm main contrib<br>deb http://ftp.tr.debian.org/debian bookworm-updates main contrib<br># security updates<br>deb http://security.debian.org bookworm-security main contrib<br>deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>root@vm-host:~#</strong> cd /etc/apt/sources.list.d<br><br><strong>root@vm-host:~# nano /etc/apt/sources.list.d/ceph.list</strong><br># deb https://enterprise.proxmox.com/debian/ceph-quincy bookworm enterprise<br>deb http://download.proxmox.com/debian/ceph-quincy bookworm no-subscription<br>deb http://download.proxmox.com/debian/ceph-reef bookworm no-subscription<br><br><strong>root@vm-host:~# nano /etc/apt/sources.list.d/pve-enterprise.list</strong><br># deb https://enterprise.proxmox.com/debian/pve bookworm pve-enterprise</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Package Repositories</strong><br>https://pve.proxmox.com/wiki/Package_Repositories</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>I hope it was helpful…</strong></p>
<!-- /wp:paragraph -->
