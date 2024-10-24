---
layout: post
title: How To Install Zabbix Agent on Ubuntu 22.04.1 LTS
date: 2022-09-10 19:58
author: theguler
comments: true
categories: [Monitoring]
---
<!-- wp:image {"id":4397,"width":487,"height":274,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/zabbix.jpg?w=1024" alt="" class="wp-image-4397" width="487" height="274" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Step 1 - Install Zabbix repository</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">wget https://repo.zabbix.com/zabbix/6.2/ubuntu/pool/main/z/zabbix-release/zabbix-release_6.2-4%2Bubuntu22.04_all.deb
dpkg -i zabbix-release_6.2-4+ubuntu22.04_all.deb
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Step 2 – Install Zabbix Agent on Ubuntu</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo apt update
sudo apt install zabbix-agent</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Step 3 –Edit Zabbix agent configuration file</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo nano /etc/zabbix/zabbix_agentd.conf

##########################################
#Server=[zabbix server ip]
#Hostname=[Hostname of client system ]

Server=10.5.10.83
Hostname=zabbix-node.guler.com</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Step 4</strong> - <strong>Zabbix-agent listens on port 10050 by default. Verify this:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo netstat -pnltu</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Step 5 - If you have&nbsp;ufw&nbsp; Firewall enabling</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Allow port 10050 on the firewall. This is used by Zabbix agent daemon.</strong>
sudo ufw allow 10050/tcp</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Step 6 – "Finally" Manage Zabbix Service</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo systemctl restart zabbix-agent
sudo systemctl enable zabbix-agent
#sudo systemctl stop zabbix-agent
sudo systemctl status zabbix-agent</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":4402,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/zabbix_status.png?w=1024" alt="" class="wp-image-4402" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best Regards.</strong></p>
<!-- /wp:paragraph -->
