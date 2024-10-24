---
layout: post
title: Microsoft Exchange TCP/IP Allow Services and Ports
date: 2022-07-31 16:17
author: theguler
comments: true
categories: [Microsoft Exchange Server]
---
<!-- wp:image {"id":284,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/exchange-2016-1.png?w=400" alt="" class="wp-image-284" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>It is enough to open the following Ports on your Firewall according to the usage requirement.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Port	Function</strong>
<strong>-</strong>TCP port 25 - SMTP
<strong>-</strong>TCP port 26 - SSL secured SMTP
<strong>-</strong>TCP port 110 - Post Office Protocol v. 3 (POP3)
<strong>-</strong>TCP port 995 - SSL secured POP3
<strong>-</strong>TCP port 143 - Internet Message Access Protocol v. 4 (IMAP4)
<strong>-</strong>TCP port 993 - SSL secured IMAP4
<strong>-</strong>TCP port 80 - HTTP for Outlook Web Access
<strong>-</strong>TCP port 443 - SSL secured HTTP for Outlook Web Access (HTTPS)
<strong>-</strong>TCP/UDP port 389 - Lightweight Directory Access Protocol (LDAP)
<strong>-</strong>TCP port 3268 - LDAP communications with an Active Directory Global Catalog Server
<strong>-</strong>TCP port 119 - Network News Transfer Protocol (NNTP)
<strong>-</strong>TCP port 563 - SSL secured NNTP
<strong>-</strong>TCP port 135 - Remote Procedure Protocol (RPC) however it will also use ports 1024 and up as needed.
<strong>-</strong>TCP/UDP port 53 - Domain Name System (DNS)
<strong>-</strong>TCP port 102 - Mail Transfer Agent (MTA) *Only used in X.400 connections.
<strong>-</strong>TCP/UDP port 88 - KERBEROS
<strong>- </strong>Additionally if you
are secureing any servers such as front-end / back-end servers with
IPSEC you will need to allow IP protocol 51 for the Authenitcation
Header, IP protocol 50, TCP/UDP port 88 for KERBEROS, and UDP port 500
for Key Exchanges.


<strong>Port	Function</strong>
25	SMTP
53	DNS
80	http
88	Kerberos
110	POP3
135	EPMAP
143	IMAP
389	LDAP
443	HTTPS
587	SMTP
993	IMAPS
995	POP3S
3268	Microsoft Global Catalog
3343	MS Cluster Net
5060	SIP
5061	SIP (over TLS)
5062	Localisation access
5075	Skype for Business Server Call Park service
5076	Skype for Business Server Audio Test service
50636	EdgeSync synchronization
64327	DAG replication</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
