---
layout: post
title: Zabbix v6.2.1 Installation and Monitoring Configuration For Centos 8 Appliance
date: 2022-07-29 15:14
author: theguler
comments: true
categories: [Monitoring]
---
<!-- wp:image {"id":3767,"width":581,"height":330,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/how-to-install-zabbix.jpg?w=900" alt="" class="wp-image-3767" width="581" height="330" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Zabbix is ​​an enterprise open source monitoring solution for networks and applications developed by <strong>Alexei Vladishev</strong> It is designed to monitor and monitor the status of various network services, servers and other network equipment.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Zabbix stores data using MySQL, PostgreSQL, SQLite, Oracle or IBM DB2 Its backend is written in C and its frontend is written in PHP. Zabbix offers several monitoring options:<br>Simple checks can verify the availability and responsiveness of standard services such as SMTP or HTTP without installing any additional software on the monitored host.<br>A Zabbix proxy can also be installed on UNIX and Windows hosts, saving CPU load, network usage, disk space, etc. can follow.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://www.zabbix.com/download_appliance">https://www.zabbix.com/download_appliance</a> (<strong>VMWare (.vmx) or all of them download</strong>)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The latest version of Appliance is based on CentOS 8 Stream with MySQL back-end. Zabbix software is pre-installed and pre-configured for trouble free deployment. You can use this Appliance by importing it into your virtual environment.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3792,"width":778,"height":410,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/apliance.png?w=1024" alt="" class="wp-image-3792" width="778" height="410" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The appliance is based on <strong>AlmaLinux 8</strong> Zabbix supports monitoring using SNMP, TCP, and ICMP inspections, as well as IPMI, JMX, SSH, Telnet, and custom variables as an alternative to installing on hosts. Zabbix supports many real-time notification mechanisms such as XMPP.<br>Released under the rules of the GNU General Public License version 2, Zabbix is ​​free software.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Zabbix version check</strong> <strong>Command:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>zabbix_server --version</strong>
<strong>zabbix_server -V</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Zabbix configuration</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The following passwords will be set by default in the Zabbix appliance device installation.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>System:</strong> root:zabbix</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Zabbix hompage frontend:</strong> Admin:zabbix</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Database:</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>root:&lt;random&gt;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>zabbix:&lt;random&gt;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>NOTE:</strong> Database passwords are randomly generated during the installation process.<br>Root password is stored inside the /root/.my.cnf file. It is not required to input a password under the "root" account. To change the database user password, changes have to be made in the following locations:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>MySQL;</strong>
/etc/zabbix/zabbix_server.conf;
/etc/zabbix/web/zabbix.conf.php.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>1.1 Repositories</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">[zabbix]
name=Zabbix Official Repository - $basearch
baseurl=https://repo.zabbix.com/zabbix/6.2/rhel/8/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-ZABBIX-A14FE591</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>1.2 Firewall configuration:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>The appliance uses iptables firewall with predefined rules:</strong>

Opened SSH port (22 TCP);
Opened Zabbix agent (10050 TCP) and Zabbix trapper (10051 TCP) ports;
Opened HTTP (80 TCP) and HTTPS (443 TCP) ports;
Opened SNMP trap port (162 UDP);
Opened outgoing connections to NTP port (53 UDP);
ICMP packets limited to 5 packets per second;
All other incoming connections are dropped.

By default, only the listed ports are open. Modify the <strong>"/etc/sysconfig/iptables"</strong> file to open additional ports and reload the firewall rules:

<strong>systemctl reload iptables</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>1.3 Using a static IP address:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">ip addr show
ip a
<strong>#To get the IP address, run</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Attention:</strong>&nbsp;To get started, boot the appliance and point a browser at the IP the appliance has received over DHCP DHCP must be enabled on the host. To access Zabbix frontend hompage, go to&nbsp;<strong><a href="https://10.x.x.50/">https://</a>&lt;host_ip&gt;&nbsp;</strong>&nbsp;(for access from the host’s browser bridged mode should be enabled in the VM network settings).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>By default the appliance uses DHCP to obtain the IP address. To specify a static IP address setting:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Open: </strong>/etc/sysconfig/network-scripts/
<strong>#Edit File: </strong>ifcfg-eth0 file;
<strong>#Finally network restart:</strong> 
systemctl restart network

DEVICE="eth0"
BOOTPROTO=static
NM_CONTROLLED="no"
PERSISTENT_DHCLIENT=1
ONBOOT="yes"
TYPE=Ethernet
DEFROUTE=yes
PEERDNS=yes
PEERROUTES=yes
IPV4_FAILURE_FATAL=yes
NAME="eth0"
IPADDR=10.5.10.50
NETMASK=255.255.255.0
GATEWAY=10.5.10.1
DNS1=10.5.10.10
DNS2=</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>By default, access to the frontend is allowed from anywhere.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This can be customized in&nbsp;<strong>/etc/nginx/conf.d/zabbix.conf</strong>. Nginx has to be restarted after modifying this file. To do so, log in using SSH as&nbsp;<strong>root</strong>&nbsp;user and execute:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>systemctl restart nginx</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":3810,"width":855,"height":367,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/z2.png?w=1024" alt="" class="wp-image-3810" width="855" height="367" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>1.4 Changing time zone:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>By default the appliance uses UTC for the system clock. To change the time zone, copy the appropriate file from&nbsp;<em>/usr/share/zoneinfo</em>&nbsp;to&nbsp;<em>/etc/localtime</em>, for example:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>cp /usr/share/zoneinfo/Europe/Riga /etc/localtime</strong>

<strong>Changes to Zabbix configuration</strong>
Frontend timezone is set to Europe/Riga (this can be modified in 
<strong>/etc/php-fpm.d/zabbix.conf;</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Upgrading</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">systemctl list-units zabbix*
<strong>#System Services show Systemd services are available</strong>

dnf update zabbix*
<strong>#The Zabbix appliance packages may be upgraded.</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>(We will cover the Zabbix server resource injection configuration in another article.)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. - I hope it was helpful</strong>.</p>
<!-- /wp:paragraph -->
