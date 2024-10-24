---
layout: post
title: Debian Linux Setup/Conf. Cheat Sheet II
date: 2023-12-06 20:54
tags: [Debian]
author: theguler
comments: true
categories: [Debian]
---
<!-- wp:image {"lightbox":{"enabled":true},"id":10044,"width":"470px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/debian_cheat_2.png?w=887" alt="" class="wp-image-10044" style="width:470px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>🖧🌐 Network Configuration:</strong><br><strong>-----------------------------|</strong><br>ip a<br>systemctl status networking<br>#systemctl restart networking<br><br>sudo systemctl status networking.service<br>#sudo systemctl restart NetworkManager.service<br>#sudo systemctl restart networking.service<br><br><strong>🏴‍☠️ File:</strong> sudo nano /etc/network/interfaces<br><br><strong>#DHCP<br>--------------------------------|</strong><br># The loopback network interface<br>  auto lo<br>  iface lo inet loopback<br><br><strong>#STATIC<br>--------------------------------|</strong><br># Primary network interface<br>    auto enp2s1<br>    iface enp2s1 inet static<br>    address 10.5.10.44<br>    netmask 255.255.255.0<br>    gateway 10.5.10.1<br>    dns-domain guler.com<br>    dns-nameservers 10.5.10.10 1.1.1.1 8.8.8.8<br><br><strong>✅🛡️ Firewall Management (UFW &amp; GUFW):<br>----------------------------------------|</strong><br><strong>UFW:</strong><br>#sudo apt-get install ufw<br>ufw --help<br>sudo ufw status<br>sudo ufw show added<br>sudo ufw enable<br>sudo ufw disable<br>sudo reload firewall<br>sudo ufw disable &amp;&amp; sudo ufw enable &amp; sudo ufw reset <strong>#reset</strong><br><br>sudo ufw deny ssh <strong>#spesific servis</strong><br>sudo ufw allow http<br>sudo ufw allow from 10.4.10.45 <strong>#allow-deny</strong><br>sudo ufw deny 22/tcp <strong>#spesific port</strong><br>sudo ufw delete allow 8080 <strong>#delete rule</strong><br>sudo ufw allow 1000:2000/tcp <strong>#spesific port aralığı</strong><br><br>sudo ufw default deny incoming <strong>#tüm gelenleri engelle</strong><br>sudo ufw default allow outgoing #<strong>tüm gidenlere izin ver</strong><br><br><strong>GUFW:</strong><br>#sudo apt-get install gufw<br>gufw<br><br><strong>&gt;&gt;&gt; Default Ports</strong><br><strong>MongoDB:</strong> 27017/tcp<br><strong>MySQL:</strong> 3306/tcp<br><strong>Postgres:</strong> 5432/tcp<br><strong>Redis:</strong> 6379/tcp<br><br>🐛 <strong>"OpenLDAP"</strong> <strong>Configure Authentication<br>--------------------------------------|</strong><br>............ .etc</pre>
<!-- /wp:preformatted -->
