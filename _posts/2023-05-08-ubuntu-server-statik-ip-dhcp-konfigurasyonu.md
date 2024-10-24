---
layout: post
title: Static IP and DHCP Configuration in Ubuntu
date: 2023-05-08 22:13
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"id":7085,"width":"529px","height":"auto","sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ip_cvb.jpg?w=828" alt="" class="wp-image-7085" style="width:529px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Show my ip address</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo ip a
ifconfig</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Go to<strong> "/etc/netplan/" </strong>and edit the required file</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#sudo vi /etc/netplan/01-netcfg.yaml</strong><br><strong>#sudo vi /etc/netplan/00-installer-config.yaml</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"># This is the network config written by 'subiquity'<br># Static IP Conf.<br>network:<br>  ethernets:<br>    ens33:<br>      addresses:<br>      - 10.5.10.47/24<br>      nameservers:<br>        addresses:<br>        - 10.5.10.10<br>        search:<br>        - guler.com<br>      routes:<br>      - to: default<br>        via: 10.5.10.1<br>  version: 2</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"># This is the network config written by 'subiquity'<br># DHCP Client Conf-1<br>network:<br>  version: 2<br>  renderer: networkd<br>  ethernets:<br>    ens33:  # Ağ arayüz adınızı buraya yazın, ens33 sadece bir örnektir.<br>      dhcp4: true<br><br><br># This is the network config written by 'subiquity'<br># DHCP Client Conf-2<br>network:<br>  ethernets:<br>    epns160:<br>      dhcp4: true<br>  version: 2</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Apply network settings configuration changes and update network settings</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo netplan apply</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Best Regards. – Saygılarımla.</strong></p>
<!-- /wp:paragraph -->
