---
layout: post
title: Uncomplicated Firewall Overview [UFW]
date: 2024-09-21 12:45
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"id":14520,"width":"448px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/linux-ufw.jpg?w=1024" alt="" class="wp-image-14520" style="width:448px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>UFW was developed as an open source firewall by Canonical's security team in 2008. UFW communicates with netfilter running in the Linux kernel to manage iptables in the background, which routes network packets. For the user, UFW simplifies the complex process of configuring iptables by providing a simplified interface and commands. These configurations are translated into iptables in the background. There is also a fork called Gufw that uses a graphical interface. <strong>Source Code:</strong> <a href="https://launchpad.net/ufw/+download">https://launchpad.net/ufw</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Alternatives:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Iptables</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>OPNsense</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Firewalld</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>PFsense</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Gufw Firewall</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>IPFire</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>.etc</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#apt install ufw<br>ufw version<br>ufw status verbose<br><br>ufw status numbered <strong>#[The first added rule is valid first]</strong><br>ufw insert 1 allow from 192.168.1.200 to any port 443 <strong>#[Define primacy rule]</strong><br><br><strong>#Default UFW Policies</strong><br>ufw default deny incoming <strong>#[Block incoming rules]</strong><br>ufw default allow outgoing <strong>#[Allow outgoing rules]</strong><br><br><strong>#[UFW Management]</strong><br>ufw enable<br>ufw disable<br><br>ufw deny 21 <strong>#[Spesific Services Ports]</strong><br>ufw deny ftp<br>ufw allow 22<br>ufw allow ssh<br><br>ufw app list <strong>#[Service based]</strong><br>ufw allow “LDAPS”<br>cat /etc/services<br><br><strong>#Rate Limiting</strong><br>ufw limit ssh/tcp comment <strong>'Limit of 6 connection per minute'</strong><br><br>ufw allow 8080 comment 'ISS Delete on Friday' <strong>#[Add Comment]</strong><br>ufw allow 3000:3100/tcp <strong>#[Port Range/Protocol]</strong><br><br>ufw delete allow 22 <strong>#[Delete Rule]</strong><br>ufw delete allow 22/TCP<br><br>ufw allow from 10.5.25.85 <strong>#[Spesific ip All Allow]</strong><br>ufw delete allow from 10.5.25.85 <strong>#[Delete Rule]</strong><br>ufw deny from 10.5.10./24 <strong>#[Subnets Deny/Allow]</strong><br>ufw deny in on eth0 from 10.5.10.10 <strong>#[Network Interface Deny/Allow]</strong><br><br>ufw default allow forward <strong>#[Allow gateway Forwarding]</strong><br><br><strong>#UFW Configuration:</strong><br>/etc/ufw/before.rules<br>/etc/default/ufw<br><br>ufw logging on <strong>#[UFW Logging On/Off]</strong><br>/var/log/messages<br>/var/log/syslog<br><br>systemctl enable ufw <strong>#[Service Management]</strong><br>systemctl disable ufw<br>systemctl restart ufw<br><br>#ufw reset <strong>#[Factory Reset and Backup]</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Hey man, to say you learned something, you have to dig deeper!</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->



<script src="https://giscus.app/client.js"
        data-repo="faruk-guler/faruk-guler.github.io"
        data-repo-id="R_kgDOM77PCQ"
        data-category="[ENTER CATEGORY NAME HERE]"
        data-category-id="[ENTER CATEGORY ID HERE]"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>