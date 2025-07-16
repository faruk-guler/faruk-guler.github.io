---
layout: post
title: Windows DHCP Server Failover Conf.
date: 2022-05-13 00:17
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":8323,"width":"518px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dhcp_failover.jpg?w=1024" alt="" class="wp-image-8323" style="width:518px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Windows Server DHCP Failover Configuration: </strong>Installing a DHCP role on a Windows Server allows that server to distribute IP addresses on the network. However, using a single DHCP server may cause the distribution of IP addresses in the network to be interrupted and the devices connected to the network may experience difficulties in communication in case the server fails.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Therefore, two DHCP servers can be configured using the DHCP failover feature. All DHCP configuration information is automatically synchronized between these servers, including IP addresses and other settings. In this way, in case of a DHCP server failure, the other server continues to serve and the distribution of IP addresses in the network continues uninterrupted.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For this process, a server with at least Windows Server 2012 or newer must be prepared first. After the DHCP role setup is performed, the DHCP failover feature must be configured. This process includes configuring DHCP servers as failover partners and performing synchronization.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Two DHCP servers must be prepared for the DHCP failover feature. They will be configured as failover partners. DHCP servers must include at least one DHCP scope for IP addresses to be synchronized.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>A failover partner relationship is then established between the DHCP servers and synchronization settings are made. The synchronization interval and the synchronization frequency are determined. This process ensures that all changes made between DHCP servers are synchronized.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Finally, DHCP failover is tested and ensured that the system is working properly. Thus, uninterrupted distribution of IP addresses of devices used in the network is ensured.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>First of all, a new server will be installed on it, including the DHCP role, and it will be included in the domain.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3120,"width":"459px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dhcp.png?w=800" alt="" class="wp-image-3120" style="width:459px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>***DHCP Failover Features***<br>***The following specifications apply to DHCP failover:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>***You cannot configure DHCP failover in a DHCP scope to include more than (2) two DHCP servers.</strong>

<strong>***DHCP failover only supports DHCPv4 scopes. Failover cannot be enabled in DHCPv6 scopes.</strong>

DHCP failover partners must both be running Windows Server 2012 or a later operating system.

DHCP failover can be configured and settings changed without needing to pause, stop, or restart the DHCP Server service.
<strong>
***If the parameters of a failover enabled scope are changed, these settings must be "manually" copied to the public DHCP server. Note: If you use IP address management (IPAM) on Windows Server 2012 R2 to change scope settings with failover, automatic replication of scope settings is available.</strong>

Replication of scope settings can be initiated from any DHCP server to the failover partner server.

Clustered DHCP is supported with DHCP failover. For failover purposes, a DHCP cluster is treated as a single DHCP server. See DHCP failover and Windows Failover Clustering for more information.

DHCP clients must be able to communicate with both DHCP failover partner servers either directly or using a DHCP relay.

DHCP servers configured as failover partners can exist in different subnets, but this is not required.

When DHCP failover is enabled in a DHCP scope, the DHCP server that renews the DHCP client lease may be different from the DHCP server that originally issued the lease.

Two DHCP servers configured as failover partners will attempt to maintain a persistent TCP/IP connection.

Two separate, synchronized client lease databases are maintained independently by each DHCP failover partner server.

DHCP servers configured as failover partners are both aware of the status of the DHCP service on the other server and are notified of any change in this status with minimal delay.

If two DHCP servers configured as failover partners cannot communicate, measures are taken to prevent the same IP address lease from being given to two different DHCP clients.

If a DHCP server becomes unavailable without successfully synchronizing all DHCP client information with the failover partner, measures are taken to ensure DHCP lease continuity for DHCP clients.</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Let's start....</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":3122,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dhcp1.png?w=940" alt="" class="wp-image-3122" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>On the Authorization screen, we need to authorize a user for the DHCP Server. Since we will be the administrator user, we complete the DHCP server authorization by selecting the first option "Use the following user's credentials" and pressing the Commit button.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3124,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dhcp2.png?w=950" alt="" class="wp-image-3124" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>then I apply the following steps to <strong>"ANATOLIA" </strong>(old DHCP server), which I was using before.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3126,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dhcp4.png?w=618" alt="" class="wp-image-3126" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":3128,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dhcp5.png?w=1024" alt="" class="wp-image-3128" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>My second server came automatically in the This authorized DHCP Server section on the Add Server screen. We will mark the This authorized DHCP Server section and select our second server and proceed. we choose the <strong>"ANGORA"</strong> server that we will backup.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3130,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dhcp6.png?w=1024" alt="" class="wp-image-3130" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The Create a new failover relationship screen appears, we continue the DHCP Failover&nbsp;configuration on this screen.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Relationship Name: &nbsp;</strong>Descriptive name given to the DHCP Failover Cluster we have configured.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Maximum Client Lead Time (MCLT):&nbsp;</strong>It is the period defined in addition to the lease period of a DHCP client. In this case, for example, if 8 hours of lease time is set on DHCP, and if the Maximum client lead time (MCLT) value is 1 hour, the lease duration will be 9 hours in total. This Maximum client lead time (MCLT) value is sent to the second server and added to the lease periods. Normally, according to RFC 2131 standards, in DHCP Failover configuration, the lease records must be registered on both DHCP servers in order for the main DHCP server to approve the IP address leased to a client with a DHCPACK message. Since such an operation will slow down the DHCP performance, the primary DHCP server gives the client its ip address and confirms it with DHCPACK, and then sends this change to the second DHCP server, which is the replication partner, with a replication update packet. If the communication between the primary DHCP server and the second server, which is the Failover Partner, is lost, then the Maximum client lead time (MCLT) specified here is added to the end of the lease.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>In the Mode section;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Load Balance Mode:&nbsp;</strong>Configures two DHCP servers in load sharing mode. DHCP servers work with each other as "Active-Active". With the Load Balance Percentage, the address distribution percentage of the DHCP servers, or in other words, the load percentage slice on the server is determined.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Hot Standby Mode: </strong>It is the configuration mode where one of the DHCP servers provides active service and the second server waits as a backup in passive mode. DHCP servers work as Active-Passive.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>State Switchover Interval: </strong>It is the part where the time interval that the DHCP server transmits its status down to the other server when the network connection is lost is determined. If it is not checked, this notification must be made manually by the administrator with the DHCP Server console or PowerShell.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Enable Message Authentication:</strong> It is used to verify failover replication between servers.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Shared Secret: </strong>The failover connection between the servers allows the replication to be made with the password written here. This ensures that DHCP clients are protected against threats from rogue DHCP servers. "Shared Secret" is a password shared between client and server. The client sends an authentication request with the value "Shared Secret" before receiving a response from the DHCP server. If the server recognizes the correct "Shared Secret" value, the IP address and other configurations are securely provided to the client.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3132,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dhcp7.png?w=1024" alt="" class="wp-image-3132" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>On this screen, we see all the settings we have configured for DHCP Failover. We start the replication between the two servers by starting the DHCP Failover that we have configured with Finish.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3134,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dhcp8.png?w=1024" alt="" class="wp-image-3134" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Finally, when we open the<strong> "ANGORA" DHCP Console</strong>, we see that the structure is added as Failover in the "Failover Relationship" section.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3138,"sizeSlug":"large","linkDestination":"none","className":"is-resized"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dhcp9-1.png?w=1024" alt="" class="wp-image-3138" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>#Types <b style="font-weight: bold">#</b></strong><b>Advanced / Assign IP addresses dynamically options</b></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":8634,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/bootp_.png?w=403" alt="" class="wp-image-8634" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>DHCP: </strong>The DHCP protocol can distribute IP addresses to both operating system and non-operating system devices. That is, it can be used for devices that do not have an operating system, such as computers and network devices.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>BOOTP:</strong> BOOTP can also distribute IP addresses to devices with and without an operating system. However, since the BOOTP protocol has a more limited structure and is generally an older protocol, the DHCP protocol is preferred.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Both:</strong> Both protocols can be used for both types of devices. However, since DHCP is more commonly used today, DHCP is preferred in most cases. DHCP offers more customization options and flexibility and generally provides better performance.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Important 1</strong><br>Replication can be initiated from any DHCP server in a failover relationship. The settings configured on the server where the replication was initiated will overwrite the settings on the failover partner server. Therefore, always make sure that replication is started on the server configured with the settings you want to use.</h2>
<!-- /wp:heading -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Important 2</strong><br>Changes must be copied MANUALLY. Automatic duplication of reservations and scope changes DOES NOT happen. To do Replication between servers, you need to click <strong>&gt;</strong> <strong>Replicate Failover Scopes…</strong> on IPv4. You can also duplicate failover settings using the Command line. (CMD/PS) </h2>
<!-- /wp:heading -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>***"DHCP failover is not supported for Internet Protocol version 6 (IPv6) scopes."</strong></h2>
<!-- /wp:heading -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Important 3<br></strong>When replicating settings between DHCP failover partner servers with different OS versions (for example: Windows Server 2012 R2 and Windows Server 2016), always change the settings and start the replication from the DHCP server with the newer OS version. This ensures that settings are recognized and consistently replicated by both failover partners.</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. I hope it was useful.</strong></p>
<!-- /wp:paragraph -->
