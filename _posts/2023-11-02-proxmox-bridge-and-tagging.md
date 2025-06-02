---
layout: post
title: Proxmox Bridge and Tagging [Network Configuration]
date: 2023-11-02 10:11
author: theguler
comments: true
categories: [Virtualization Technology]
---
<!-- wp:image {"id":14382,"width":"505px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/afbeelding-1.png?w=609" alt="" class="wp-image-14382" style="width:505px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#vi /etc/network/interfaces<br>#systemctl restart networking.service</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Backup your Config before making changes to this file!<br># $: cp interfaces interfaces.bak</strong><br><br>auto lo<br>iface lo inet loopback<br><br><strong>#Network Interfaces</strong><br><strong>#</strong> iface eno1 inet manual<br><strong>#</strong> iface eno2 inet manual<br><strong>#</strong> iface enp1s0f0np0 inet manual<br>iface enp1s0f1np1 inet manual<br><br><strong>#<strong>Linux</strong></strong> <strong>Bridge</strong><br>auto vmbr0<br>iface vmbr0 inet static<br>        address 10.5.21.19/24<br>        gateway 10.5.21.1<br>        bridge-ports enp1s0f1np1<br>        bridge-stp off<br>        bridge-fd 0<br>        bridge-vlan-aware yes<br>        bridge-vids 2-4094<br><br><strong>#Linux VLAN 21</strong><br>auto vmbr0.21<br>iface vmbr0.21 inet static<br>        address 10.5.21.19/24<br>        gateway 10.5.21.1<br><br><strong>#Linux Bond</strong><br>#--------<br>#--------<br><br>source /etc/network/interfaces.d/*</pre>
<!-- /wp:preformatted -->
